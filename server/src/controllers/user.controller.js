import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req , res) => {
    const {email , password , username} = req.body

    if(!email.trim || !password.trim() || !username.trim()) return ApiError(400 , "All Feilds Are Required..")

    const avatarLocalpath = req.files?.avatar[0].avatarLocalpath

    console.log(avatarLocalpath)

});




export {
    registerUser
}