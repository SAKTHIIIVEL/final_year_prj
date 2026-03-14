import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { verifyJWT, authorizeRoles } from "../middleware/auth.js";
import { productValidator } from "../validators/productValidator.js";
import validate from "../middleware/validate.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), productValidator, validate, createProduct);
router.put("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), productValidator, validate, updateProduct);
router.delete("/:id", verifyJWT, authorizeRoles("ADMIN", "SUPER_ADMIN"), deleteProduct);

export default router;
