import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.get("/stats", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getDashboardStats);

export default router;
