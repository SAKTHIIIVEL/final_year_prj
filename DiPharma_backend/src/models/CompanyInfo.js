import mongoose from "mongoose";

const companyInfoSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
      // e.g. "General", "Contact", "About", "Operations"
    },
    keywords: {
      // Comma-separated trigger words e.g. "address,location,where are you"
      type: [String],
      default: [],
    },
    question: {
      type: String,
      required: true,
      trim: true,
      // e.g. "Where is DiPharma located?"
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      // e.g. "Our headquarters is at 123 Street, Chennai."
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

companyInfoSchema.index({ category: 1, isActive: 1 });

const CompanyInfo = mongoose.model("CompanyInfo", companyInfoSchema);
export default CompanyInfo;
