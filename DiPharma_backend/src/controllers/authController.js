import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import { sendAdminCredentials } from "../services/emailService.js";

export const superAdminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, role: "SUPER_ADMIN" });
    if (!admin) return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const token = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    res.json({ success: true, data: { admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token, refreshToken } });
  } catch (error) { next(error); }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, error: { code: "INVALID_CREDENTIALS", message: "Invalid email or password" } });

    const token = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    res.json({ success: true, data: { admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role }, token, refreshToken } });
  } catch (error) { next(error); }
};

export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ success: false, error: { code: "DUPLICATE", message: "Admin with this email already exists" } });

    const admin = await Admin.create({ name, email, password, role: "ADMIN", displayPassword: password });
    res.status(201).json({ success: true, data: { admin: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role } } });

    // Send welcome email (fire-and-forget)
    sendAdminCredentials({ name, email, password }).catch((err) =>
      console.error("Admin welcome email failed:", err.message)
    );
  } catch (error) { next(error); }
};

export const getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find({ role: "ADMIN" })
      .select("name email role displayPassword createdAt")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: admins });
  } catch (error) { next(error); }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Admin not found" } });
    if (admin.role === "SUPER_ADMIN") return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Cannot delete a Super Admin" } });
    await Admin.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: { message: "Admin deleted successfully" } });
  } catch (error) { next(error); }
};

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return res.status(400).json({ success: false, error: { code: "NO_TOKEN", message: "Refresh token required" } });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(401).json({ success: false, error: { code: "INVALID_TOKEN", message: "Invalid refresh token" } });

    const newToken = admin.generateAccessToken();
    const newRefreshToken = admin.generateRefreshToken();

    res.json({ success: true, data: { token: newToken, refreshToken: newRefreshToken } });
  } catch (error) {
    return res.status(401).json({ success: false, error: { code: "INVALID_TOKEN", message: "Invalid or expired refresh token" } });
  }
};

export const getProfile = async (req, res) => {
  res.json({ success: true, data: { admin: req.admin } });
};
