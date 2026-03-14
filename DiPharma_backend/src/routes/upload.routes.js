import express from "express";
import { upload, uploadImage } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

// POST /api/v1/upload — upload a single image
router.post("/", verifyJWT, upload.single("image"), uploadImage);

export default router;
