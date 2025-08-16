import { Lable } from "../models/Lable.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/uploadToClodinary.js";

const generateJwtToken = async (id) => {
  try {
    const user = await User.findById(id);

    const token = user.generateJwtToken();

    return token;
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while genrating JWT token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email.trim || !password.trim() || !username.trim())
    return ApiError(400, "All Feilds Are Required..");

  // console.log(req.file)

  const avatarLocalpath = req.file?.path;
  let avatar = "";

  // console.log(avatarLocalpath);
  if (avatarLocalpath) {
    avatar = await uploadToCloudinary(avatarLocalpath);
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) throw new ApiError("402", "User Already Registered...");

  const user = await User.create({
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url || "",
  });

  if (!user) throw new ApiError(500, "Error while registering...");

  const lable = await Lable.create({
    name: "General",
    notes: [],
    owner: user._id,
  });

  user.lables.push(lable._id);
  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select("-password");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User Registered Succesfully..."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(404, "Email or Password Missing");

  const existUser = await User.findOne({ email });

  if (!existUser) throw new ApiError(403, "User Does not exist...");

  const isPasswordCorrect = await existUser.comparePassword(password);

  // console.log(isPasswordCorrect, ":::: Password status ...");

  if (!isPasswordCorrect)
    throw new ApiError(403, "Invalid Crediental : Password is incorrect...");

  const token = await generateJwtToken(existUser._id);
  // console.log(token);

  const userData = await User.findById(existUser._id).select("-password");

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 2,
    })
    .json(new ApiResponse(201, { userData, token }, "Login sucessfully..."));
});

const currentUser = asyncHandler(async (req, res) => {
  return res.json(req.user);
});

const logout = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .clearCookie("token", { httpOnly: true, secure: true })
    .json(new ApiResponse(201, null, "Logout sucessfully..."));
});

export { registerUser, loginUser, currentUser, logout };
