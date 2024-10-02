const asyncHandler = require("../utills/asyncHandler.js");
const ApiError = require("../utills/ApiError.js");
const User = require("../models/user.model.js");
//const { uploadOnCloudinary } = require("../utils/cloudinary.js");
const ApiResponse = require("../utills/ApiResponse.js");

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, username, paasword } = req.body;

    if ([fullname, email, username, paasword].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User email or username exists");
    }

    
    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        paasword
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Send response
    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

module.exports = {
    registerUser
};
