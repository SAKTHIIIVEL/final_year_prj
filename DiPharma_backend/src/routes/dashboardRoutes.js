import { Router } from "express";
import { getDashboardStats, getSuperAdminStats } from "../controllers/dashboardController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.get("/stats", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getDashboardStats);
router.get("/super-admin-stats", verifyJWT, authorizeRoles("SUPER_ADMIN"), getSuperAdminStats);

export default router;
