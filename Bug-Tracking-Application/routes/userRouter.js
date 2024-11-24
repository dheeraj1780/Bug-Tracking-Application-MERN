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
  updateUser,
  getAllUsers,
  register,
} from "../controllers/userController.js";

const router = Router();

router
  .route("/register")
  .post(requireRole("admin"), validateUserInput, register);

router.route("/users").get(requireRole(["admin", "incharge"]), getAllUsers);

router
  .route("/current-user")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    getCurrentUser
  );
router
  .route("admin/update-user")
  .patch(requireRole("admin"), validateUserUpdateInput, updateUser);
router
  .route("admin/delete-user/:id")
  .delete(
    requireRole("admin"),
    restrictSelfDelete,
    preventAdminDelete,
    deleteUser
  );

export default router;
