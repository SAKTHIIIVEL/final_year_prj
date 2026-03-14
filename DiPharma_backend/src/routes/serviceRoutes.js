import { Router } from "express";
import { getServices, getServiceBySlug, createService, updateService, deleteService, getAllServicesAdmin } from "../controllers/serviceController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import { serviceValidator } from "../validators/serviceValidator.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/", getServices);
router.get("/admin/all", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), getAllServicesAdmin);
router.get("/:slug", getServiceBySlug);
router.post("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), serviceValidator, validate, createService);
router.put("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), serviceValidator, validate, updateService);
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), deleteService);

export default router;
