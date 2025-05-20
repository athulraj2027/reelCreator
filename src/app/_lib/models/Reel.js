import mongoose from "mongoose";

const ReelSchema = new mongoose.Schema(
  {
    character: { type: String, required: true },
    topic: { type: String, required: true },
    script: { type: String, default: undefined },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtitle: [{ id: Number, duration: Number, text: String }],
  },
  { timestamps: true }
);

const Reel = mongoose.models.Reel || mongoose.model("Reel", ReelSchema);

export default Reel;
