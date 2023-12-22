import mongoose from "mongoose";

const simSchema = mongoose.Schema(
  {
    ask: {
      type: String,
      required: true,
    },
    ans: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Sim = mongoose.model("Simsimi", simSchema);

export default Sim;
