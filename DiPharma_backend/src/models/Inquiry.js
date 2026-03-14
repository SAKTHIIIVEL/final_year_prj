import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["unread", "read", "resolved"], default: "unread" },
  },
  { timestamps: true }
);

inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
