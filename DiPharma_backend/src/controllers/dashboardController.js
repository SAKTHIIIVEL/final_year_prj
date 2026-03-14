import Application from "../models/Application.js";
import Inquiry from "../models/Inquiry.js";
import Job from "../models/Job.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import FAQ from "../models/FAQ.js";
import Admin from "../models/Admin.js";
import ChatbotInteraction from "../models/ChatbotInteraction.js";

// Helper: fill missing dates with 0 for last 30 days
const fillDates = (data) => {
  const map = {};
  data.forEach((d) => (map[d._id] = d.count));
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    result.push({ date: key, count: map[key] || 0 });
  }
  return result;
};

// Helper: convert aggregation array to object
const toBreakdown = (arr) => {
  const obj = {};
  arr.forEach((item) => (obj[item._id || "unknown"] = item.count));
  return obj;
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalApplications, pendingApplications,
      totalInquiries, unreadInquiries,
      activeJobs, totalProducts, totalServices, totalFaqs,
      inquiryStatusBreakdown, applicationStatusBreakdown,
      dailyInquiries, dailyApplications,
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "unread" }),
      Job.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Service.countDocuments({ isActive: true }),
      FAQ.countDocuments({ isActive: true }),
      Inquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Application.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Application.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    res.json({
      success: true,
      data: {
        totalApplications, pendingApplications,
        totalInquiries, unreadInquiries,
        activeJobs, totalProducts, totalServices, totalFaqs,
        inquiryStatusBreakdown: toBreakdown(inquiryStatusBreakdown),
        applicationStatusBreakdown: toBreakdown(applicationStatusBreakdown),
        dailyInquiries: fillDates(dailyInquiries),
        dailyApplications: fillDates(dailyApplications),
      },
    });
  } catch (error) { next(error); }
};

export const getSuperAdminStats = async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalInquiries, totalApplications, totalChatbotMessages, totalAdmins,
      activeJobs, totalProducts, totalServices, totalFaqs,
      inquiryStatusBreakdown, applicationStatusBreakdown, applicationRoleBreakdown,
      dailyInquiries, dailyApplications, dailyChatbot,
      recentInquiries, recentApplications,
    ] = await Promise.all([
      Inquiry.countDocuments(),
      Application.countDocuments(),
      ChatbotInteraction.countDocuments(),
      Admin.countDocuments(),
      Job.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Service.countDocuments({ isActive: true }),
      FAQ.countDocuments({ isActive: true }),
      Inquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Application.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Application.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Inquiry.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Application.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      ChatbotInteraction.aggregate([
        { $match: { createdAt: { $gte: thirtyDaysAgo } } },
        { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Inquiry.find().sort({ createdAt: -1 }).limit(10).select("firstName lastName email subject status createdAt"),
      Application.find().sort({ createdAt: -1 }).limit(10).select("name email role status createdAt"),
    ]);

    res.json({
      success: true,
      data: {
        overview: { totalInquiries, totalApplications, totalChatbotMessages, totalAdmins, activeJobs, totalProducts, totalServices, totalFaqs },
        inquiryAnalytics: { statusBreakdown: toBreakdown(inquiryStatusBreakdown), dailyTrend: fillDates(dailyInquiries) },
        applicationAnalytics: {
          statusBreakdown: toBreakdown(applicationStatusBreakdown),
          roleBreakdown: applicationRoleBreakdown.map((r) => ({ role: r._id || "Unknown", count: r.count })),
          dailyTrend: fillDates(dailyApplications),
        },
        chatbotAnalytics: { dailyTrend: fillDates(dailyChatbot) },
        recentActivity: { inquiries: recentInquiries, applications: recentApplications },
      },
    });
  } catch (error) { next(error); }
};
