import Job from "../models/Job.js";

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: jobs });
  } catch (error) { next(error); }
};

export const getJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Job not found" } });
    res.json({ success: true, data: job });
  } catch (error) { next(error); }
};

export const createJob = async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (error) { next(error); }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!job) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Job not found" } });
    res.json({ success: true, data: job });
  } catch (error) { next(error); }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Job not found" } });
    res.json({ success: true, message: "Job deleted" });
  } catch (error) { next(error); }
};
