import mongoose from "mongoose";

const BugSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Bug name is required"],
    },
    description: {
      type: String,
      required: [true, "Bug description is required"],
    },
    testerFeedback: {
      type: String,
      required: [true, "Tester feedback is required"],
    },
    bugSeverity: {
      type: String,
      enum: ["high", "medium", "low"],
      required: [true, "Bug severity is required"],
    },
    status: {
      type: String,
      enum: ["Assigned", "InProgress", "Fixed", "InHold"],
      default: "Assigned",
    },
    images: {
      type: [String], // Array of image URLs
      validate: [arrayLimit, "Exceeds the limit of 3 images"],
    },
    frontUrl: String,
    backUrl: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 3;
}

export default mongoose.model("Bug", BugSchema);
