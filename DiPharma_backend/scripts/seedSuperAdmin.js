/**
 * seedSuperAdmin.js
 * ─────────────────
 * One-time script to create the Super Admin account in the
 * new MongoDB Atlas database.
 *
 * Run with:
 *   node scripts/seedSuperAdmin.js
 * (from inside DiPharma_backend/)
 */

import "dotenv/config";
import mongoose from "mongoose";
import Admin from "../src/models/Admin.js";

const SUPER_ADMIN = {
  name: "DiPharma Super Admin",
  email: "admin@dipharma.com",
  password: "DiPharma@2026",
  displayPassword: "DiPharma@2026",
  role: "SUPER_ADMIN",
};

async function seed() {
  try {
    // ── 1. Connect to Atlas ──────────────────────────────────────────
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI not found in .env");

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB Atlas:", mongoose.connection.host);

    // ── 2. Check if account already exists ───────────────────────────
    const existing = await Admin.findOne({ email: SUPER_ADMIN.email });
    if (existing) {
      console.log(
        `⚠️  A Super Admin with email "${SUPER_ADMIN.email}" already exists.`
      );
      console.log("   No changes made. Exiting.");
      process.exit(0);
    }

    // ── 3. Create the Super Admin ─────────────────────────────────────
    // The Admin model's pre("save") hook will bcrypt-hash the password
    // automatically with 12 salt rounds before it reaches the database.
    const superAdmin = new Admin(SUPER_ADMIN);
    await superAdmin.save();

    console.log("🎉 Super Admin created successfully!");
    console.log("   Name  :", superAdmin.name);
    console.log("   Email :", superAdmin.email);
    console.log("   Role  :", superAdmin.role);
    console.log("   ID    :", superAdmin._id.toString());

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
