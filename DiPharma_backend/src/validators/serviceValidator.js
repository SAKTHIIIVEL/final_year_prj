import { body } from "express-validator";

export const serviceValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("slug").trim().notEmpty().withMessage("Slug is required"),
  body("shortDescription").optional().trim(),
  body("fullDescription").optional().trim(),
];
