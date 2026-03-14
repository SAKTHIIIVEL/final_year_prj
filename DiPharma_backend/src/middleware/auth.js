import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.query.token) {
      // Fallback: support ?token= query param (used for Excel downloads in new tabs)
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, error: { code: "NO_TOKEN", message: "Access token required" } });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({ success: false, error: { code: "INVALID_TOKEN", message: "Admin not found" } });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, error: { code: "TOKEN_EXPIRED", message: "Token has expired" } });
    }
    return res.status(401).json({ success: false, error: { code: "INVALID_TOKEN", message: "Invalid token" } });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.admin || !roles.includes(req.admin.role)) {
      return res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "You do not have permission to access this resource" } });
    }
    next();
  };
};
