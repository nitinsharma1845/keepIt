import mongoose from "mongoose";

const lableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    owner : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
    }
  },
  { timestamps: true }
);

export const Lable = mongoose.model("Lable", lableSchema);
