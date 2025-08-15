import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "./apiError";
import fs from "fs";

export const uploadToCloudinary = async (localpath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (!localpath) throw new ApiError(400, "Local Path is Missing...");

    const upload = await cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });

    console.log("File Uploaded to Cloudinary :::", upload);
    return upload;
  } catch (error) {
    throw new ApiError(
      500,
      "Error while uploading avatar to cloudinary ::: ",
      error
    );
  } finally {
    if (fs.existsSync(localpath)) {
      fs.unlinkSync(localpath);
    }
  }
};
