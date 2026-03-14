import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, path: req.path, method: req.method });

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, error: { code: "VALIDATION_ERROR", message: "Validation failed", details: messages } });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({ success: false, error: { code: "DUPLICATE_KEY", message: `${field} already exists` } });
  }

  if (err.name === "CastError") {
    return res.status(400).json({ success: false, error: { code: "INVALID_ID", message: "Invalid ID format" } });
  }

  if (err.message === "Invalid file type") {
    return res.status(400).json({ success: false, error: { code: "INVALID_FILE", message: "File type not allowed. Use PDF, DOCX, JPG, or PNG." } });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: { code: "SERVER_ERROR", message: err.message || "Internal server error" },
  });
};

export default errorHandler;
