import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    role: { type: String, required: true },
    message: { type: String, default: "" },
    resumePath: { type: String, default: "" },
    status: { type: String, enum: ["pending", "reviewed", "shortlisted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

applicationSchema.index({ status: 1 });
applicationSchema.index({ createdAt: -1 });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
