import mongoose from "mongoose";

const NovalnetSchema = new mongoose.Schema(
  {
    version: {
      type: String,
      required: [true, "Bug name is required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Novalnet", NovalnetSchema);
