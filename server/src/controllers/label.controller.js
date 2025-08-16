import { Lable } from "../models/Lable.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadToCloudinary } from "../utils/uploadToClodinary.js";



const createLable = asyncHandler(async (req , res)=>{
    const {name} = req.body

    if(!name) throw new ApiError(400 , "Name is Required...")

    const lable = await Lable.create({
        name,
        notes : [],
        owner : req.user._id
    })

    if(!lable) throw new ApiError(500 , "Error while creating Lable")

    return res.status(201).json(new ApiResponse(201 , lable , "Lable created..."))
})

const updateLable = asyncHandler(async (req , res)=>{
    const {name} = req.body
    const {lableId} = req.params

    if(!name) throw new ApiError(400 , "Name is required...")

    const lable = await Lable.findById(lableId)

    if(!lable) throw new ApiError(404 , "Lable not found...")

    lable.name = name
    await lable.save({validateBeforeSave : false})

    const changedLable = await Lable.findById(lableId)

    return res.status(201).json(new ApiResponse(201 , changedLable , 'Lable Name changed sucessfully'))
})

const getAllLables = asyncHandler(async (req , res)=>{
    const userId = req.user._id

    const lables = await Lable.find({owner : userId})

    return res.status(201).json(new ApiResponse(201 , lables , "Lables fetch successfully..."))
})


export {createLable , updateLable , getAllLables}