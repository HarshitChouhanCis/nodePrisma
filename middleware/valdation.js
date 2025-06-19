import { body } from "express-validator";

export const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("age").notEmpty().withMessage("Age is required"),
  body("mobileNo").notEmpty().withMessage("Mobile number is required"),
  body("address").notEmpty().withMessage("Address is required"),
];
