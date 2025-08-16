import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";
import jwt from 'jsonwebtoken'

export const authlayer = async (req, res , next) => {
  try {
    //fetch token from cookiew and header

    const token = req.cookies.token || req.headers("Authorization");

    if(!token) throw new ApiError(403 , "Unauthorization Request")

    const decodedInfo = jwt.verify(token , process.env.JWT_SECRET_KEY)

    if(!decodedInfo) throw new ApiError(403 , "Invalid Token")

    const user = await User.findById(decodedInfo._id).select('-password')

    if(!user) throw new ApiError(403 , "Invalid User : Not found user of token")

    req.user = user

    next()


  } catch (error) {
    throw new ApiError(500 , error?.message || "Something went wrong : Invalid Token")
  }
};
