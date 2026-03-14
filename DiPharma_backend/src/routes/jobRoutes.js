import { Router } from "express";
import { getJobs, getJob, createJob, updateJob, deleteJob } from "../controllers/jobController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import { jobValidator } from "../validators/jobValidator.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJob);
router.post("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), jobValidator, validate, createJob);
router.put("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), jobValidator, validate, updateJob);
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), deleteJob);

export default router;
