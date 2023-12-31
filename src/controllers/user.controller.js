import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    //check for images, check for avatar
    // upload them to cloudinary, avatar
    //create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return res


    const { fullName, email, username, password } = req.body;
    console.log("Email: ", email);


    if (fullName === "") {
        throw new ApiError(400, "fullname is required")
    }

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, 'All field are required');
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    const avatarLocalPath = req.files?.avatar[0]?.path;
    // check for avatar local path and upload avatar on cloudinary or throw error
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    const avatarResponse = await cloudinary.uploader.upload(avatarLocalPath, {
        resource_type: "auto"
    })

    if (!avatarResponse) {
        throw new ApiError(400, "Avatar File upload failed");
    }
    else {
        //file has been uploaded successfully
        console.log("File has been uploaded successfully on cloudinary : ", avatarResponse.url);
    }

    //remove the locally saved uploaded file as the upload operation got failed
    fs.unlinkSync(avatarLocalPath)

    // if cover image is available then set cover image local path
    let coverImageLocalPath = ""
    if (req.files?.coverImage) {
        coverImageLocalPath = req.files?.coverImage[0]?.path;
    }
    
    // check for cover image local path and upload on cloudinary or throw error
    let coverImageResponse = {};

    if (coverImageLocalPath !== "") {
        coverImageResponse = await cloudinary.uploader.upload(coverImageLocalPath, {
            resource_type: "auto"
        })
        console.log("File has been uploaded successfully on cloudinary : ", coverImageResponse.url);
        fs.unlinkSync(coverImageLocalPath)
    }

    if (!coverImageResponse) {
        console.log(coverImageResponse);
        throw new ApiError(400, "cover image File upload failed");
    }

    const user = await User.create({
        fullName,
        avatar: avatarResponse.url,
        coverImage: coverImageResponse?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while regtering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});

export { registerUser };