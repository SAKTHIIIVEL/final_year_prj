import Application from "../models/Application.js";
import Inquiry from "../models/Inquiry.js";
import Job from "../models/Job.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import FAQ from "../models/FAQ.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalApplications, pendingApplications, totalInquiries, unreadInquiries, activeJobs, totalProducts, totalServices, totalFaqs] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: "pending" }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: "unread" }),
      Job.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true }),
      Service.countDocuments({ isActive: true }),
      FAQ.countDocuments({ isActive: true }),
    ]);

    res.json({
      success: true,
      data: { totalApplications, pendingApplications, totalInquiries, unreadInquiries, activeJobs, totalProducts, totalServices, totalFaqs },
    });
  } catch (error) { next(error); }
};
