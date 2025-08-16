import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String, //Encripted
      required: true,
    },
    avatar: {
      type: String, //Clodinary url
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = function () {
  return jwt.sign(
    {
      _id : this._id,
      avatar : this.avatar,
      username : this.username
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn : "2d"
    }
  
  );
};

export const User = mongoose.model("User", userSchema);
