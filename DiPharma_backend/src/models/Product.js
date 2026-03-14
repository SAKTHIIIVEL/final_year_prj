import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, default: "" },
    image: { type: String, default: "" },
    cardType: { type: String, enum: ["dark", "light"], default: "dark" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productSchema.index({ order: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
