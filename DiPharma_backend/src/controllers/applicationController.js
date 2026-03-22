import Application from "../models/Application.js";
import fs from "fs";
import { sendApplicationNotification, sendShortlistNotification, sendRejectionNotification } from "../services/emailService.js";
import { uploadToCloudinary } from "../middleware/upload.js";
import { generateApplicationsExcel } from "../services/excelService.js";

export const submitApplication = async (req, res, next) => {
  try {
    const { name, email, phone, countryCode, role, message } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ success: false, error: { code: "MISSING_FILE", message: "Resume file is required" } });

    let resumePath = file.path;
    const cloudinaryUrl = await uploadToCloudinary(file.path);
    if (cloudinaryUrl) {
      resumePath = cloudinaryUrl;
      fs.unlinkSync(file.path);
    }

    const application = await Application.create({ name, email, phone, countryCode, role, message, resumePath });

    try {
      const fileBase64 = cloudinaryUrl ? null : fs.readFileSync(file.path, { encoding: "base64" });
      await sendApplicationNotification({ name, email, phone, countryCode, role, message }, fileBase64, file.originalname);
    } catch (emailErr) {
      console.error("Email send failed:", emailErr.message);
    }

    if (!cloudinaryUrl && fs.existsSync(file.path)) {
      // Keep file for admin access if not on cloudinary
    }

    res.status(200).json({ success: true, message: "Application submitted successfully", data: { id: application._id } });
  } catch (error) { next(error); }
};

export const getApplications = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const applications = await Application.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Application.countDocuments(filter);
    res.json({ success: true, data: applications, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } });
  } catch (error) { next(error); }
};

export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Application not found" } });
    res.json({ success: true, data: application });
  } catch (error) { next(error); }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!application) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Application not found" } });

    // Send status email to applicant (fire-and-forget, never blocks response)
    if (status === "shortlisted") {
      sendShortlistNotification({
        name: application.name,
        email: application.email,
        role: application.role,
      }).catch((err) => console.error("Shortlist email failed:", err.message));
    } else if (status === "rejected") {
      sendRejectionNotification({
        name: application.name,
        email: application.email,
        role: application.role,
      }).catch((err) => console.error("Rejection email failed:", err.message));
    }

    res.json({ success: true, data: application });
  } catch (error) { next(error); }
};

export const exportApplicationsExcel = async (req, res, next) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    const workbook = await generateApplicationsExcel(applications);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=applications.xlsx");
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) { next(error); }
};
