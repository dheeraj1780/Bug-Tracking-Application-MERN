import mongoose from "mongoose";

const ShopSystemSchema = new mongoose.Schema(
  {
    CmsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CMS",
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: [true, "Shop System name is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ShopSystem", ShopSystemSchema);
