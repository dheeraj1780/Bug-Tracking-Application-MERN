import { Router } from "express";
const router = Router({ mergeParams: true });

import {
  createBug,
  getBugs,
  getBugById,
  updateBug,
  deleteBug,
} from "../controllers/bugController.js";
import {
  validateBugInput,
  validateBugIdParam,
  validateUpdateBugInput,
} from "../middleware/validationMiddleware.js";
import { requireRole } from "../middleware/authMiddleware.js";

router
  .route("/")
  .post(requireRole(["admin", "tester"]), validateBugInput, createBug)
  .get(requireRole(["admin", "incharge", "tester", "developer"]), getBugs);

router
  .route("/:id")
  .get(
    requireRole(["admin", "incharge", "tester", "developer"]),
    validateBugIdParam,
    getBugById
  )
  .patch(
    requireRole(["admin", "tester"]),
    validateUpdateBugInput,
    validateBugIdParam,
    updateBug
  )
  .delete(requireRole("admin"), validateBugIdParam, deleteBug);

export default router;
