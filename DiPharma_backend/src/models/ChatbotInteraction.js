import mongoose from "mongoose";

const chatbotInteractionSchema = new mongoose.Schema(
  {
    userMessage: { type: String, required: true },
    botReply: { type: String, required: true },
    sessionId: { type: String, default: null },
  },
  { timestamps: true }
);

chatbotInteractionSchema.index({ createdAt: -1 });

const ChatbotInteraction = mongoose.model("ChatbotInteraction", chatbotInteractionSchema);
export default ChatbotInteraction;
