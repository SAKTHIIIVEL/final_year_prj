import { body } from "express-validator";

export const productValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("cardType").optional().isIn(["dark", "light"]).withMessage("Card type must be dark or light"),
];
