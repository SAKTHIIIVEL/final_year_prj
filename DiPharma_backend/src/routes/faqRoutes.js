import { Router } from "express";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "../controllers/faqController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import { faqValidator } from "../validators/faqValidator.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/", getFAQs);
router.post("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), faqValidator, validate, createFAQ);
router.put("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), faqValidator, validate, updateFAQ);
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), deleteFAQ);

export default router;
