import express from "express";
import bugRouter from "./bugRouter.js";
import {
  getAllReports,
  getReport,
  deleteReport,
  updatedReport,
  createReport,
} from "../controllers/reportController.js";
import {
  validateReportInput,
  validateReportIdParam,
} from "../middleware/validationMiddleware.js";
import { requireRole } from "../middleware/authMiddleware.js";

const reportRouter = express.Router();

reportRouter
  .route("/")
  .get(requireRole(["admin", "incharge", "developer", "tester"]), getAllReports)
  .post(
    requireRole(["admin", "incharge", "tester"]),
    validateReportInput,
    createReport
  );

reportRouter
  .route("/:id")
  .get(
    requireRole(["admin", "incharge", "developer", "tester"]),
    validateReportIdParam,
    getReport
  )
  .patch(
    requireRole(["admin", "incharge"]),
    validateReportInput,
    validateReportIdParam,
    updatedReport
  )
  .delete(requireRole(["admin"]), validateReportIdParam, deleteReport);

// Use nested bug router
reportRouter.use("/:reportId/bugs", bugRouter);

export default reportRouter;
