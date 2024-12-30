import { Router } from "express";
import {
  validateUserInput,
  validateUserUpdateInput,
} from "../middleware/validationMiddleware.js";
import {
  preventAdminDelete,
  requireRole,
  restrictSelfDelete,
} from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getCurrentUser,
  updateLoggedUser,
  getAllUsers,
  register,
  updateUser,
  getUserById,
} from "../controllers/userController.js";

const router = Router();

router
  .route("/register")
  .post(requireRole("admin"), validateUserInput, register);

router.route("/users").get(requireRole(["admin", "incharge"]), getAllUsers);
router.route("/users/:id").get(requireRole("admin"), getUserById);
router
  .route("/current-user")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    getCurrentUser
  );
router
  .route("admin/update-logged-user")
  .patch(requireRole("admin"), validateUserUpdateInput, updateLoggedUser);
router
  .route("admin/delete-user/:id")
  .delete(
    requireRole("admin"),
    restrictSelfDelete,
    preventAdminDelete,
    deleteUser
  );

router
  .route("admin/update-user")
  .patch(requireRole("admin"), validateUserUpdateInput, updateUser);

export default router;
