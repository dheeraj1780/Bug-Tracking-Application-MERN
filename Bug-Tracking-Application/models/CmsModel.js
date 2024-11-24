import mongoose from "mongoose";

const CmsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "CMS name is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CMS", CmsSchema);
