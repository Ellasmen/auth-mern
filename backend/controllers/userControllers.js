// @desc Auth user/set token
// route POST/api/users/auth
// @access Public
import generateToken from "../utles/generateToken.js";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModels.js";
const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc register user
// route POST /api/users
// @access Public
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('user already exist');
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error('invalid parameter');
    }
});

// @desc Logout user
// route POST /api/users/logout
// @access Public
const LogoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User Logged user' })
};

// @desc get user profile
// route POST /api/users/profile
// @access Private
const getUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc updateuser profile
// route POST /api/users/logout
// @access Private
const updateUserprofile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
    
    if (req.body.password) {
        user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    });
}else {
    res.status(404);
    throw new Error('User not found');
}
});

export {
    authUser,
    registerUser,
    LogoutUser,
    getUserProfile,
    updateUserprofile,
};