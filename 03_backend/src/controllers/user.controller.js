import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {

    // 1. get user details from frontend

    const { username, fullName, email, password } = req.body
    // console.log('email : ', email);

    // 2. validation - not empty

    if (
        [username, fullName, email, password].some((field) => field?.trim() === '')
    ) {
        throw new ApiError(400, 'All fields are required!');
    }

    /*
    if (fullName === '') {
        throw new ApiError(400 ,"Full name is required!");
        
        }
        */


    // 3. check if user already exists: username, email

    const existedUser = await User.findOne(
        {
            $or: [{ username }, { email }]
        }
    )

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }

    // 4. check for images, check for avatar

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Avatar file is required!')
    }

    // 5. upload them to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath) : null;

    // 6. check avatar

    if (!avatar) {
        throw new ApiError(400, 'Avatar file is required!')
    }

    // 7. create user object - create entry in db

    const user = await User.create(
        {
            username: username.toLowerCase(),
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || '',
            email,
            password
        }
    )

    // 8. check if user created successfully - then select password and redresh token for remove

    const createdUser = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    // 9. check for user creation

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user!");
    }

    // 10. return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User registered successfully')
    )

})


export { registerUser }


