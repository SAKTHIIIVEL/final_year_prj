import { Router } from "express";
import { superAdminLogin, adminLogin, createAdmin, refreshToken, getProfile, getAdmins, deleteAdmin } from "../controllers/authController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import { loginValidator, createAdminValidator } from "../validators/authValidator.js";
import validate from "../middleware/validate.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/super-admin/login", authLimiter, loginValidator, validate, superAdminLogin);
router.post("/admin/login", authLimiter, loginValidator, validate, adminLogin);
router.post("/super-admin/create-admin", verifyJWT, authorizeRoles("SUPER_ADMIN"), createAdminValidator, validate, createAdmin);
router.get("/super-admin/admins", verifyJWT, authorizeRoles("SUPER_ADMIN"), getAdmins);
router.delete("/super-admin/admins/:id", verifyJWT, authorizeRoles("SUPER_ADMIN"), deleteAdmin);
router.post("/auth/refresh", refreshToken);
router.get("/auth/me", verifyJWT, getProfile);

export default router;
