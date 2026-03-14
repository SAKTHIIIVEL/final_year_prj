import Product from "../models/Product.js";
import Job from "../models/Job.js";
import FAQ from "../models/FAQ.js";
import Service from "../models/Service.js";

export const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q || q.trim().length < 2) return res.json({ success: true, data: { products: [], services: [], jobs: [], faqs: [] } });

    const regex = new RegExp(q, "i");
    const [products, services, jobs, faqs] = await Promise.all([
      Product.find({ isActive: true, $or: [{ title: regex }, { description: regex }] }).limit(10),
      Service.find({ isActive: true, $or: [{ title: regex }, { shortDescription: regex }] }).limit(10),
      Job.find({ isActive: true, $or: [{ title: regex }, { roleFocus: regex }, { location: regex }] }).limit(10),
      FAQ.find({ isActive: true, $or: [{ question: regex }, { answer: regex }] }).limit(10),
    ]);

    res.json({ success: true, data: { products, services, jobs, faqs } });
  } catch (error) { next(error); }
};
