import { Router } from "express";
import {
  validateUserInput,
  validateUserLoginInput,
} from "../middleware/validationMiddleware.js";
import { login, logout } from "../controllers/authController.js";
import { requireRole } from "../middleware/authMiddleware.js";

const router = Router();

// router
//   .route("/register")
//   .post(requireRole("admin"), validateUserInput, register);
router.route("/login").post(validateUserLoginInput, login);
router.route("/logout").get(logout);

export default router;
