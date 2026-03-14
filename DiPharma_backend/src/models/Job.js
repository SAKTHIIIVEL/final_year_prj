import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    roleFocus: { type: String, default: "" },
    location: { type: String, default: "" },
    type: { type: String, enum: ["Full Time", "Part Time", "Contract", "Internship"], default: "Full Time" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
