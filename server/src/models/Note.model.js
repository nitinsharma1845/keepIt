import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lable : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Lable",
      required : true
    },

    status: {
      type: String,
      enum: ["archived", "active", "trashed"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
