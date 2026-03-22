import { Router } from "express";
import { chatbotMessage } from "../controllers/chatbotController.js";
import { chatbotLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/message", chatbotLimiter, chatbotMessage);

export default router;
