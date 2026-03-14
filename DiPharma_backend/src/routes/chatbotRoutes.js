import { Router } from "express";
import { chatbotMessage } from "../controllers/chatbotController.js";

const router = Router();

router.post("/message", chatbotMessage);

export default router;
