import { Router } from "express";
import { submitInquiry, getInquiries, updateInquiryStatus, exportInquiriesExcel } from "../controllers/inquiryController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.post("/", submitInquiry);
router.get("/export/excel", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), exportInquiriesExcel);
router.get("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getInquiries);
router.patch("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), updateInquiryStatus);

export default router;
