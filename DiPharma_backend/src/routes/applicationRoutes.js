import { Router } from "express";
import { submitApplication, getApplications, getApplication, updateApplicationStatus, exportApplicationsExcel } from "../controllers/applicationController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/", upload.single("upload"), submitApplication);
router.get("/export/excel", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), exportApplicationsExcel);
router.get("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getApplications);
router.get("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getApplication);
router.patch("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), updateApplicationStatus);

export default router;
