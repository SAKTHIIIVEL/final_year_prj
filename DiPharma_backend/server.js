import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./src/config/db.js";
import corsOptions from "./src/config/cors.js";
import "./src/config/cloudinary.js";
import { generalLimiter } from "./src/middleware/rateLimiter.js";
import errorHandler from "./src/middleware/errorHandler.js";
import logger from "./src/utils/logger.js";

// Route imports
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import applicationRoutes from "./src/routes/applicationRoutes.js";
import inquiryRoutes from "./src/routes/inquiryRoutes.js";
import faqRoutes from "./src/routes/faqRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import searchRoutes from "./src/routes/searchRoutes.js";
import chatbotRoutes from "./src/routes/chatbotRoutes.js";
import uploadRoutes from "./src/routes/upload.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// --------------- Global Middleware ---------------
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors(corsOptions));
app.use(generalLimiter);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------- Health Check ---------------
app.get("/api/v1/health", (req, res) => {
  res.json({ success: true, message: "DiPharma API is running", timestamp: new Date().toISOString() });
});

// --------------- API Routes ---------------
app.use("/api/v1", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/inquiries", inquiryRoutes);
app.use("/api/v1/faqs", faqRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/search", searchRoutes);
app.use("/api/v1/chatbot", chatbotRoutes);
app.use("/api/v1/upload", uploadRoutes);

// --------------- Legacy endpoints (backward compatibility) ---------------
// These match the original server.js endpoints so existing frontend calls don't break
import multer from "multer";
import axios from "axios";
import fs from "fs";

const legacyStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const legacyUpload = multer({
  storage: legacyStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    cb(null, allowed.includes(file.mimetype));
  },
});

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_HEADERS = { "api-key": process.env.BREVO_API_KEY, "Content-Type": "application/json" };

app.post("/submit-form", legacyUpload.single("upload"), async (req, res) => {
  try {
    const { name, email, phone, countryCode, role, message } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ status: "error", message: "Resume file is required" });

    const fileBase64 = fs.readFileSync(file.path, { encoding: "base64" });

    const ownerEmail = {
      sender: { email: process.env.SENDER_EMAIL, name: "Career Portal" },
      to: [{ email: process.env.OWNER_EMAIL }],
      subject: `New Job Application - ${role}`,
      htmlContent: `<h3>New Job Application</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${countryCode} ${phone}</p><p><b>Job Position:</b> ${role}</p><p><b>Message:</b><br/>${message}</p>`,
      attachment: [{ content: fileBase64, name: file.originalname }],
    };

    const ackEmail = {
      sender: { email: process.env.SENDER_EMAIL, name: "HR Team" },
      to: [{ email }],
      subject: "Application Received",
      htmlContent: `<p>Hi ${name},</p><p>Thank you for applying for the <b>${role}</b> position.</p><p>We have received your application and will get back to you shortly.</p><br/><p>Best regards,<br/>HR Team</p>`,
    };

    await axios.post(BREVO_URL, ownerEmail, { headers: BREVO_HEADERS });
    await axios.post(BREVO_URL, ackEmail, { headers: BREVO_HEADERS });

    fs.unlinkSync(file.path);
    res.status(200).json({ status: "success", message: "Application submitted successfully" });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, countryCode, subject, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const ownerEmail = {
      sender: { email: process.env.SENDER_EMAIL, name: "Website Contact Form" },
      to: [{ email: process.env.OWNER_EMAIL }],
      subject: `New Contact Message: ${subject}`,
      htmlContent: `<h3>New Contact Form Submission</h3><p><b>Name:</b> ${firstName} ${lastName}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${countryCode} ${phone}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b><br/>${message}</p>`,
    };

    const ackEmail = {
      sender: { email: process.env.SENDER_EMAIL, name: "Support Team" },
      to: [{ email }],
      subject: "We received your message",
      htmlContent: `<p>Hi ${firstName},</p><p>Thank you for contacting us.</p><p>We've received your message regarding "${subject}" and will get back to you shortly.</p><br/><p>Best regards,<br/>Support Team</p>`,
    };

    await axios.post(BREVO_URL, ownerEmail, { headers: BREVO_HEADERS });
    await axios.post(BREVO_URL, ackEmail, { headers: BREVO_HEADERS });

    res.status(200).json({ status: "success", message: "Message sent successfully" });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// --------------- Error Handler (must be last) ---------------
app.use(errorHandler);

// --------------- Start Server ---------------
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log(`\n🚀 DiPharma API running on http://localhost:${PORT}`);
      console.log(`📋 Health check: http://localhost:${PORT}/api/v1/health`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
