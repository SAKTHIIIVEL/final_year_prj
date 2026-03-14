import { body } from "express-validator";

export const jobValidator = [
  body("title").trim().notEmpty().withMessage("Job title is required"),
  body("type").optional().isIn(["Full Time", "Part Time", "Contract", "Internship"]).withMessage("Invalid job type"),
];
