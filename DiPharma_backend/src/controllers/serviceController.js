import Service from "../models/Service.js";

export const getServices = async (req, res, next) => {
  try {
    const services = await Service.find({ isActive: true }).select("title slug shortDescription heroImage").sort({ createdAt: 1 });
    res.json({ success: true, data: services });
  } catch (error) { next(error); }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Service not found" } });
    res.json({ success: true, data: service });
  } catch (error) { next(error); }
};

export const createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) { next(error); }
};

export const updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Service not found" } });
    res.json({ success: true, data: service });
  } catch (error) { next(error); }
};

export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Service not found" } });
    res.json({ success: true, message: "Service deleted" });
  } catch (error) { next(error); }
};

export const getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, data: services });
  } catch (error) { next(error); }
};
