import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    cms: {
      type: mongoose.Types.ObjectId,
      ref: "CMS",
    },
    shopsystem: {
      type: mongoose.Types.ObjectId,
      ref: "ShopSystem",
    },
    novalnetVersion: {
      type: mongoose.Types.ObjectId,
      ref: "Novalnet",
    },
    name: {
      type: String,
      required: true,
    },
    opt1: {
      name: String,
    },
    opt2: {
      name: String,
    },
    opt3: {
      name: String,
    },
    opt4: {
      name: String,
    },
    status: {
      type: String,
      enum: ["Assigned", "InProgress", "Done", "InHold"],
      default: "Assigned",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
