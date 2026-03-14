import Inquiry from "../models/Inquiry.js";
import { sendContactNotification } from "../services/emailService.js";
import { generateInquiriesExcel } from "../services/excelService.js";

export const submitInquiry = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, countryCode, subject, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "All fields are required" } });
    }

    const inquiry = await Inquiry.create({ firstName, lastName, email, phone, countryCode, subject, message });

    try {
      await sendContactNotification({ firstName, lastName, email, phone, countryCode, subject, message });
    } catch (emailErr) {
      console.error("Contact email send failed:", emailErr.message);
    }

    res.status(200).json({ success: true, message: "Message sent successfully", data: { id: inquiry._id } });
  } catch (error) { next(error); }
};

export const getInquiries = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Inquiry.countDocuments(filter);
    res.json({ success: true, data: inquiries, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
    if (!inquiry) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Inquiry not found" } });
    res.json({ success: true, data: inquiry });
  } catch (error) { next(error); }
};

export const exportInquiriesExcel = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    const workbook = await generateInquiriesExcel(inquiries);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=inquiries.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) { next(error); }
};
