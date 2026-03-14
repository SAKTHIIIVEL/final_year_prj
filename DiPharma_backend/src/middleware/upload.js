import multer from "multer";
import path from "path";
import { cloudinary, cloudinaryConfigured } from "../config/cloudinary.js";

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

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

export const uploadToCloudinary = async (filePath) => {
  if (!cloudinaryConfigured) return null;
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder: "dipharma/resumes", resource_type: "auto" });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    return null;
  }
};

export default upload;
