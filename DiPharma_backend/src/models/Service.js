import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
}, { _id: false });

const benefitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
}, { _id: false });

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, default: "" },
    fullDescription: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    overviewImage: { type: String, default: "" },
    featureImage: { type: String, default: "" },
    benefitImage1: { type: String, default: "" },
    benefitImage2: { type: String, default: "" },
    features: [featureSchema],
    benefits: [benefitSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


const Service = mongoose.model("Service", serviceSchema);
export default Service;
