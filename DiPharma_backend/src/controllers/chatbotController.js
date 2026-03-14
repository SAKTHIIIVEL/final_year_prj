import ChatbotInteraction from "../models/ChatbotInteraction.js";
import FAQ from "../models/FAQ.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";

// ── Navigation intent mapping ──
const NAV_INTENTS = [
  { keywords: ["contact", "get in touch", "reach you", "contact page", "message you", "appointment", "book", "booking", "schedule", "consultation", "meet", "visit"], path: "/contact", message: "Taking you to our Contact page! You can book an appointment or reach us there. 📬" },
  { keywords: ["product", "products", "show products", "your products", "what products"], path: "/products", message: "Here are our Products! 📦" },
  { keywords: ["service", "services", "show services", "your services", "what services"], path: "/services", message: "Let me show you our Services! 🏥" },
  { keywords: ["about", "about dipharma", "about you", "who are you", "about page", "about company"], path: "/about", message: "Learn more about DiPharma! 🏢" },
  { keywords: ["career", "careers", "jobs", "apply", "job opening", "hiring", "work with"], path: "/career", message: "Explore career opportunities! 💼" },
  { keywords: ["home", "go home", "main page", "homepage", "start page"], path: "/", message: "Taking you to the Home page! 🏠" },
];

// ── Greeting patterns ──
const GREETINGS = ["hi", "hello", "hey", "hii", "hiii", "good morning", "good afternoon", "good evening", "howdy", "greetings"];

// ── Company info ──
const COMPANY_INFO = {
  phone: "+91-9677787817",
  email: "sssakthivel928@gmail.com",
  name: "DiPharma",
  description: "DiPharma is a pharmaceutical company providing quality healthcare products and services.",
};

// ── Fuzzy keyword match score ──
const matchScore = (text, keywords) => {
  let score = 0;
  const words = text.split(/\s+/);
  for (const kw of keywords) {
    if (text.includes(kw)) score += kw.split(/\s+/).length * 2;
    else {
      for (const w of words) {
        if (w.length > 3 && kw.includes(w)) score += 1;
      }
    }
  }
  return score;
};

export const chatbotMessage = async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.json({ success: true, data: { reply: "Please type a message so I can help you! 😊" } });
  }

  const lowerMsg = message.toLowerCase().trim();
  let reply = "";
  let action = null;
  let path = null;

  try {
    // 1. Check for greetings
    if (GREETINGS.some((g) => lowerMsg === g || lowerMsg.startsWith(g + " ") || lowerMsg.startsWith(g + "!"))) {
      reply = `Hello! 👋 Welcome to DiPharma! I can help you with:\n\n• Information about our **Products** and **Services**\n• Answering your **FAQs**\n• **Navigating** to any page (try: "go to contact page")\n\nWhat would you like to know?`;
      logInteraction(message, reply, req);
      return res.json({ success: true, data: { reply } });
    }

    // 2. Check for navigation intents
    for (const nav of NAV_INTENTS) {
      if (nav.keywords.some((kw) => lowerMsg.includes(kw))) {
        reply = nav.message;
        action = "navigate";
        path = nav.path;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply, action, path } });
      }
    }

    // 3. Check for company info questions
    if (lowerMsg.includes("phone") || lowerMsg.includes("call") || lowerMsg.includes("number")) {
      reply = `📞 You can reach us at **${COMPANY_INFO.phone}**. Or visit our Contact page for more ways to get in touch!`;
      logInteraction(message, reply, req);
      return res.json({ success: true, data: { reply, action: "navigate", path: "/contact" } });
    }

    if (lowerMsg.includes("email") || lowerMsg.includes("mail")) {
      reply = `📧 You can email us at **${COMPANY_INFO.email}**. We typically respond within 24 hours!`;
      logInteraction(message, reply, req);
      return res.json({ success: true, data: { reply } });
    }

    // 4. Try to match against FAQs
    const faqs = await FAQ.find({ isActive: true });
    if (faqs.length > 0) {
      let bestFaq = null;
      let bestScore = 0;

      for (const faq of faqs) {
        const qWords = faq.question.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
        const score = matchScore(lowerMsg, qWords);
        if (score > bestScore) {
          bestScore = score;
          bestFaq = faq;
        }
      }

      if (bestFaq && bestScore >= 2) {
        reply = `**${bestFaq.question}**\n\n${bestFaq.answer}`;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply } });
      }
    }

    // 5. Try to match against Products
    if (lowerMsg.includes("product") || lowerMsg.includes("medicine") || lowerMsg.includes("pharma")) {
      const products = await Product.find({ isActive: true }).select("title description").limit(10);
      if (products.length > 0) {
        const productList = products.map((p) => `• **${p.title}**: ${p.description?.substring(0, 80) || ""}...`).join("\n");
        reply = `Here are our products:\n\n${productList}\n\nWould you like to explore them? Say "go to products" to see all details!`;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply } });
      }
    }

    // 6. Try to match against Services
    if (lowerMsg.includes("service") || lowerMsg.includes("offer") || lowerMsg.includes("provide")) {
      const services = await Service.find({ isActive: true }).select("title shortDescription").limit(10);
      if (services.length > 0) {
        const serviceList = services.map((s) => `• **${s.title}**: ${s.shortDescription?.substring(0, 80) || ""}...`).join("\n");
        reply = `Here are our services:\n\n${serviceList}\n\nSay "go to services" to explore them in detail!`;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply } });
      }
    }

    // 7. Check for specific product/service by name
    const products = await Product.find({ isActive: true }).select("title description");
    for (const p of products) {
      if (lowerMsg.includes(p.title.toLowerCase())) {
        reply = `📦 **${p.title}**\n\n${p.description || "No description available."}\n\nSay "go to products" to see all our products!`;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply } });
      }
    }

    const services = await Service.find({ isActive: true }).select("title shortDescription fullDescription");
    for (const s of services) {
      if (lowerMsg.includes(s.title.toLowerCase())) {
        reply = `🏥 **${s.title}**\n\n${s.shortDescription || s.fullDescription?.substring(0, 200) || "No description available."}\n\nSay "go to services" to learn more!`;
        logInteraction(message, reply, req);
        return res.json({ success: true, data: { reply } });
      }
    }

    // 8. Help / fallback
    if (lowerMsg.includes("help") || lowerMsg.includes("what can you")) {
      reply = `I'm DiPharma's assistant! Here's what I can do:\n\n🔹 Answer questions about our **Products** & **Services**\n🔹 Help with **FAQs**\n🔹 **Navigate** you to any page (try: "show me services")\n🔹 Provide **contact info**\n\nJust ask me anything!`;
      logInteraction(message, reply, req);
      return res.json({ success: true, data: { reply } });
    }

    // 9. Thank you
    if (lowerMsg.includes("thank") || lowerMsg.includes("thanks")) {
      reply = "You're welcome! 😊 Let me know if there's anything else I can help with!";
      logInteraction(message, reply, req);
      return res.json({ success: true, data: { reply } });
    }

    // 10. Default fallback
    reply = `I'm not sure about that, but I can help you with:\n\n• Product & service information\n• Frequently asked questions\n• Page navigation (try: "go to contact")\n• Contact details (try: "phone number")\n\nOr visit our contact page for direct assistance!`;
    action = null;
    logInteraction(message, reply, req);
    return res.json({ success: true, data: { reply } });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    reply = `I'm having trouble right now. Please contact us at ${COMPANY_INFO.phone} or visit our contact page for assistance!`;
    return res.json({ success: true, data: { reply, action: "navigate", path: "/contact" } });
  }
};

// Fire-and-forget logging
function logInteraction(userMessage, botReply, req) {
  ChatbotInteraction.create({
    userMessage,
    botReply,
    sessionId: req.headers["x-session-id"] || null,
  }).catch((err) => console.error("Chatbot log failed:", err.message));
}
