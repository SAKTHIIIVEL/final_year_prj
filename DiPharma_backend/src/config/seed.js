import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import Job from "../models/Job.js";
import FAQ from "../models/FAQ.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/dipharma_db";

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // --- Super Admin ---
    const existingSA = await Admin.findOne({ role: "SUPER_ADMIN" });
    if (!existingSA) {
      await Admin.create({ name: "Super Admin", email: "admin@dipharma.com", password: "DiPharma@2026", role: "SUPER_ADMIN" });
      console.log("✅ Super Admin created: admin@dipharma.com / DiPharma@2026");
    } else {
      console.log("⏭️  Super Admin already exists");
    }

    // --- Products ---
    if ((await Product.countDocuments()) === 0) {
      await Product.insertMany([
        { title: "DI Polyclinic", description: "Comprehensive healthcare services with advanced technology and compassionate care for all your medical needs.", cardType: "dark", order: 1 },
        { title: "DI Lab", description: "State-of-the-art diagnostic laboratory services offering accurate and timely results for all types of medical tests.", cardType: "light", order: 2 },
        { title: "DI Pharmacy", description: "Reliable pharmacy services ensuring availability of quality medicines and pharmaceutical products at affordable prices.", cardType: "dark", order: 3 },
        { title: "DI Home Care", description: "Professional home healthcare services bringing quality medical care and assistance right to your doorstep.", cardType: "light", order: 4 },
      ]);
      console.log("✅ 4 Products seeded");
    } else {
      console.log("⏭️  Products already exist");
    }

    // --- Services ---
    if ((await Service.countDocuments()) === 0) {
      await Service.insertMany([
        {
          title: "Doctor Will", slug: "doctor-will",
          shortDescription: "On-demand doctor consultations and home visits for personalized healthcare.",
          fullDescription: "Doctor Will is our flagship service bringing qualified medical professionals to your doorstep. Whether you need a routine check-up, specialist consultation, or emergency medical attention, our network of experienced doctors is just a call away. We provide comprehensive medical consultations with follow-up care plans tailored to your individual needs.",
          features: [
            { title: "Home Visits", description: "Qualified doctors visit your home for consultations" },
            { title: "24/7 Availability", description: "Round-the-clock medical support when you need it" },
            { title: "Specialist Network", description: "Access to specialists across multiple disciplines" },
            { title: "Digital Prescriptions", description: "Receive prescriptions and care plans digitally" },
          ],
          benefits: [
            { title: "Convenience", description: "No waiting rooms — healthcare at your doorstep" },
            { title: "Personalized Care", description: "One-on-one attention from experienced doctors" },
            { title: "Cost Effective", description: "Affordable consultation fees with transparent pricing" },
          ],
        },
        {
          title: "DI Wholesale", slug: "di-wholesale",
          shortDescription: "Wholesale pharmaceutical distribution with competitive pricing and reliable supply chain.",
          fullDescription: "DI Wholesale is our pharmaceutical distribution arm providing a vast range of medicines and healthcare products at wholesale prices. We connect manufacturers directly with retailers, hospitals, and clinics, ensuring a seamless supply chain with competitive pricing and guaranteed quality.",
          features: [
            { title: "Wide Product Range", description: "Thousands of pharmaceutical products available" },
            { title: "Competitive Pricing", description: "Best wholesale rates in the market" },
            { title: "Quality Assurance", description: "All products sourced from certified manufacturers" },
            { title: "Fast Delivery", description: "Efficient logistics ensuring timely delivery" },
          ],
          benefits: [
            { title: "Cost Savings", description: "Significant savings through wholesale pricing" },
            { title: "Reliable Supply", description: "Consistent availability of essential medicines" },
            { title: "Quality Guaranteed", description: "Certified products with proper documentation" },
          ],
        },
        {
          title: "DI Laboratory Services", slug: "di-laboratory",
          shortDescription: "Advanced diagnostic and laboratory services with NABL-accredited testing facilities.",
          fullDescription: "DI Laboratory Services offers comprehensive diagnostic testing with state-of-the-art equipment and experienced technicians. From routine blood tests to advanced genetic screening, our laboratory provides accurate, fast, and reliable results that healthcare professionals can trust.",
          features: [
            { title: "Advanced Diagnostics", description: "Latest equipment for accurate and precise results" },
            { title: "Quick Turnaround", description: "Most results available within 24 hours" },
            { title: "Home Sample Collection", description: "Convenient sample collection at your doorstep" },
            { title: "Online Reports", description: "Access your reports digitally anytime" },
          ],
          benefits: [
            { title: "Accuracy", description: "99.9% accuracy with modern calibrated equipment" },
            { title: "Convenience", description: "Home collection and digital report access" },
            { title: "Affordability", description: "Competitive pricing with health packages available" },
          ],
        },
        {
          title: "DI Research", slug: "di-research",
          shortDescription: "Pharmaceutical research and development driving innovation in healthcare solutions.",
          fullDescription: "DI Research is our dedicated R&D division focused on discovering and developing innovative pharmaceutical solutions. Our team of researchers works at the cutting edge of medical science to develop new formulations, improve existing drugs, and contribute to the advancement of healthcare globally.",
          features: [
            { title: "Drug Development", description: "Research and development of new pharmaceutical formulations" },
            { title: "Clinical Trials", description: "Conducting and managing clinical research studies" },
            { title: "Quality Testing", description: "Rigorous testing and quality assurance protocols" },
            { title: "Innovation Lab", description: "Dedicated facility for experimental research" },
          ],
          benefits: [
            { title: "Cutting-Edge Solutions", description: "Access to the latest pharmaceutical innovations" },
            { title: "Compliance", description: "All research follows international regulatory standards" },
            { title: "Collaboration", description: "Partnership opportunities for academic institutions" },
          ],
        },
        {
          title: "Indocontinental 7", slug: "indocontinental-7",
          shortDescription: "Global healthcare logistics and supply chain management across continents.",
          fullDescription: "Indocontinental 7 is our global healthcare logistics division specializing in the seamless movement of pharmaceutical products across international borders. We handle everything from customs clearance to cold chain management, ensuring that life-saving medicines reach their destinations safely and on time.",
          features: [
            { title: "Global Logistics", description: "End-to-end pharmaceutical shipping across continents" },
            { title: "Cold Chain Management", description: "Temperature-controlled transport for sensitive products" },
            { title: "Regulatory Compliance", description: "Handling all customs and regulatory documentation" },
            { title: "Track & Trace", description: "Real-time tracking of shipments worldwide" },
          ],
          benefits: [
            { title: "Global Reach", description: "Distribution network spanning multiple continents" },
            { title: "Reliability", description: "On-time delivery with quality maintenance" },
            { title: "Expertise", description: "Specialized team for pharmaceutical logistics" },
          ],
        },
      ]);
      console.log("✅ 5 Services seeded");
    } else {
      console.log("⏭️  Services already exist");
    }

    // --- Jobs ---
    if ((await Job.countDocuments()) === 0) {
      await Job.insertMany([
        { title: "Research Assistant - Pharmaceutical Formulations", roleFocus: "Assisting in formulation development, sample testing, documentation, and lab maintenance.", location: "Chennai, Tamil Nadu", type: "Full Time" },
        { title: "Medical Sales Representative", roleFocus: "Building client relationships, presenting pharmaceutical products, achieving sales targets.", location: "Multiple Locations", type: "Full Time" },
        { title: "Quality Control Analyst", roleFocus: "Testing raw materials and finished products, maintaining quality standards, preparing reports.", location: "Chennai, Tamil Nadu", type: "Full Time" },
        { title: "Digital Marketing Executive", roleFocus: "Managing social media, content creation, SEO optimization, and digital campaigns.", location: "Remote / Chennai", type: "Full Time" },
        { title: "Warehouse Operations Intern", roleFocus: "Inventory management, order processing, stock verification, and logistics support.", location: "Chennai, Tamil Nadu", type: "Internship" },
      ]);
      console.log("✅ 5 Jobs seeded");
    } else {
      console.log("⏭️  Jobs already exist");
    }

    // --- FAQs ---
    if ((await FAQ.countDocuments()) === 0) {
      await FAQ.insertMany([
        { question: "What is diverse innovation?", answer: "Diverse Innovation Pharmaceuticals Pvt. Ltd. is a growing healthcare organization committed to delivering comprehensive and accessible medical services to the community.", order: 1 },
        { question: "What services does DI Pharma provide?", answer: "We provide a wide range of healthcare services including polyclinic consultations, laboratory diagnostics, pharmaceutical distribution, home healthcare, and pharmaceutical research & development.", order: 2 },
        { question: "How can I apply for a position?", answer: "You can apply through our Career page. Browse the available positions, fill in the application form with your details, and upload your resume. Our HR team will review your application and get back to you.", order: 3 },
        { question: "Where is DI Pharma located?", answer: "Our headquarters is located in Chennai, Tamil Nadu, India. We have multiple offices and service centers across the region. Please visit our Contact page for detailed address information.", order: 4 },
      ]);
      console.log("✅ 4 FAQs seeded");
    } else {
      console.log("⏭️  FAQs already exist");
    }

    console.log("\n🎉 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
