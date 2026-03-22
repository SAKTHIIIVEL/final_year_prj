import { Router } from "express";
import {
  getAllCompanyInfo,
  getActiveCompanyInfo,
  createCompanyInfo,
  updateCompanyInfo,
  deleteCompanyInfo,
} from "../controllers/companyInfoController.js";

const router = Router();

router.get("/", getAllCompanyInfo);          // All entries (admin UI)
router.get("/active", getActiveCompanyInfo); // Only active entries
router.post("/", createCompanyInfo);
router.put("/:id", updateCompanyInfo);
router.delete("/:id", deleteCompanyInfo);

export default router;
