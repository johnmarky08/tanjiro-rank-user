import mongoose from "mongoose";

const rankSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    lvl: {
      type: Number,
      required: true,
    },
    exp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;
