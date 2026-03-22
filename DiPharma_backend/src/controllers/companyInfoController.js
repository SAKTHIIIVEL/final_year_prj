import CompanyInfo from "../models/CompanyInfo.js";

// GET all company info entries (admin)
export const getAllCompanyInfo = async (req, res) => {
  try {
    const entries = await CompanyInfo.find().sort({ category: 1, order: 1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET only active entries (used by chatbot internally — not needed as HTTP route, but useful)
export const getActiveCompanyInfo = async (req, res) => {
  try {
    const entries = await CompanyInfo.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST create a new entry
export const createCompanyInfo = async (req, res) => {
  try {
    const { category, keywords, question, answer, isActive, order } = req.body;
    if (!category || !question || !answer) {
      return res.status(400).json({ success: false, error: "Category, question, and answer are required." });
    }

    // Normalize keywords — accept comma-separated string OR array
    const keywordArray = Array.isArray(keywords)
      ? keywords.map((k) => k.trim().toLowerCase()).filter(Boolean)
      : String(keywords || "")
          .split(",")
          .map((k) => k.trim().toLowerCase())
          .filter(Boolean);

    const entry = await CompanyInfo.create({
      category: category.trim(),
      keywords: keywordArray,
      question: question.trim(),
      answer: answer.trim(),
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
    });

    res.status(201).json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// PUT update an entry
export const updateCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, keywords, question, answer, isActive, order } = req.body;

    const keywordArray = Array.isArray(keywords)
      ? keywords.map((k) => k.trim().toLowerCase()).filter(Boolean)
      : String(keywords || "")
          .split(",")
          .map((k) => k.trim().toLowerCase())
          .filter(Boolean);

    const entry = await CompanyInfo.findByIdAndUpdate(
      id,
      {
        category: category?.trim(),
        keywords: keywordArray,
        question: question?.trim(),
        answer: answer?.trim(),
        isActive,
        order,
      },
      { new: true, runValidators: true }
    );

    if (!entry) return res.status(404).json({ success: false, error: "Entry not found." });
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE an entry
export const deleteCompanyInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await CompanyInfo.findByIdAndDelete(id);
    if (!entry) return res.status(404).json({ success: false, error: "Entry not found." });
    res.json({ success: true, message: "Entry deleted." });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
