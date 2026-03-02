import dotenv from "dotenv";
dotenv.config();

import express from "express";
import multer from "multer";
import axios from "axios";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ================= BREVO CONFIG =================
const BREVO_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_HEADERS = {
  "api-key": process.env.BREVO_API_KEY,
  "Content-Type": "application/json",
};

// ================= API ROUTE =================
app.post("/submit-form", upload.single("upload"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      countryCode,
      role,
      message,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    // Convert file to base64
    const fileBase64 = fs.readFileSync(file.path, {
      encoding: "base64",
    });

    // ================= MAIL TO OWNER =================
    const ownerMail = {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Career Portal",
      },
      to: [{ email: process.env.OWNER_EMAIL }],
      subject: `New Job Application - ${role}`,
      htmlContent: `
        <h3>New Job Application</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode} ${phone}</p>
        <p><b>Job Position:</b> ${role}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
      attachment: [
        {
          content: fileBase64,
          name: file.originalname,
        },
      ],
    };

    await axios.post(BREVO_URL, ownerMail, {
      headers: BREVO_HEADERS,
    });

    // ================= AUTO-REPLY TO USER =================
    const userMail = {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "HR Team",
      },
      to: [{ email }],
      subject: "Application Received",
      htmlContent: `
        <p>Hi ${name},</p>
        <p>Thank you for applying for the <b>${role}</b> position.</p>
        <p>We have received your application and will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>HR Team</p>
      `,
    };

    await axios.post(BREVO_URL, userMail, {
      headers: BREVO_HEADERS,
    });

    // Remove uploaded file
    fs.unlinkSync(file.path);

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending email",
    });
  }
});

// ================= CONTACT API =================
app.post("/api/contact", async (req, res) => {
  try {
    const {
      countryCode,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    } = req.body;

    // Basic server-side validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !subject ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ================= MAIL TO OWNER =================
    const ownerMail = {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Website Contact Form",
      },
      to: [{ email: process.env.OWNER_EMAIL }],
      subject: `New Contact Message: ${subject}`,
      htmlContent: `
        <h3>New Contact Form Submission</h3>
        <p><b>Name:</b> ${firstName} ${lastName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${countryCode} ${phone}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    };

    await axios.post(BREVO_URL, ownerMail, {
      headers: BREVO_HEADERS,
    });

    // ================= AUTO-REPLY TO USER =================
    const userMail = {
      sender: {
        email: process.env.SENDER_EMAIL,
        name: "Support Team",
      },
      to: [{ email }],
      subject: "We received your message",
      htmlContent: `
        <p>Hi ${firstName},</p>
        <p>Thank you for contacting us.</p>
        <p>We’ve received your message regarding <b>${subject}</b> and will get back to you shortly.</p>
        <br/>
        <p>Best regards,<br/>Support Team</p>
      `,
    };

    await axios.post(BREVO_URL, userMail, {
      headers: BREVO_HEADERS,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
