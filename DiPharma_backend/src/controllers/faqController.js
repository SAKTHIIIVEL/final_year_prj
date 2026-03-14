import FAQ from "../models/FAQ.js";

export const getFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, data: faqs });
  } catch (error) { next(error); }
};

export const createFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) { next(error); }
};

export const updateFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "FAQ not found" } });
    res.json({ success: true, data: faq });
  } catch (error) { next(error); }
};

export const deleteFAQ = async (req, res, next) => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "FAQ not found" } });
    res.json({ success: true, message: "FAQ deleted" });
  } catch (error) { next(error); }
};
