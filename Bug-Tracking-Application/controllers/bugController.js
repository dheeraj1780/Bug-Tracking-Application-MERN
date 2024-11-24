import Bug from "../models/BugModel.js";
import Report from "../models/ReportModel.js";
import { NotFoundError } from "../errors/customErrors.js";
import { StatusCodes } from "http-status-codes";

// Create a new bug for a specific report
export const createBug = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const { reportId } = req.params;
  const report = await Report.findById(reportId);

  if (!report) throw new NotFoundError(`No report found with ID ${reportId}`);

  const bug = await Bug.create({
    ...req.body,
    reportId,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ bug });
};

// Get all bugs for a specific report
export const getBugs = async (req, res) => {
  const { reportId } = req.params;
  const bugs = await Bug.find({ reportId });
  res.status(StatusCodes.OK).json({ bugs });
};

// Get a specific bug by ID
export const getBugById = async (req, res) => {
  const { id } = req.params;
  const bug = await Bug.findById(id);
  res.status(StatusCodes.OK).json({ bug });
};

// Update a specific bug by ID
export const updateBug = async (req, res) => {
  const { id } = req.params;
  const updatedBug = await Bug.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ bug: updatedBug });
};

// Delete a specific bug by ID
export const deleteBug = async (req, res) => {
  const { id } = req.params;
  const deletedBug = await Bug.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: "Bug deleted", bug: deletedBug });
};
