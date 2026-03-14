export const chatbotMessage = async (req, res) => {
  const { message } = req.body;
  // Placeholder — will be replaced with RAG model integration
  res.json({
    success: true,
    data: {
      reply: "Thank you for your message! Our AI assistant is being set up. For now, please use our contact form or call us at +91-9677787817 for assistance.",
      userMessage: message,
    },
  });
};
