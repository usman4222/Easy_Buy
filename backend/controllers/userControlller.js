import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import { createToken } from "../utils/createToken.js"
import catchAsyncError from "../middleware/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"

export const signUp = catchAsyncError(async (req, res, next) => {
    const { username, email, password } = req.body

    if (!username || !email || !password || username === "" || email === "" || password === "") {
        return next(new ErrorHandler("All fields are required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    try {
        await newUser.save()
        res.json("Sign Up successfully")
    } catch (error) {
        next(error)
    }
})

export const signIn = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        return next(new ErrorHandler("Email or password is required", 400)); 
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(new ErrorHandler("Invalid Email or Password", 404)); 
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(new ErrorHandler("Invalid Email or Password", 404)); 
        }

        const token = createToken(validUser.email, validUser._id, validUser.role);

        console.log("Generated Token:", token);

        const { password: pass, ...rest } = validUser._doc;

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({ token, user: rest });

    } catch (error) {
        next(error);
    }
})




export const signOut = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });

        return res.status(200).json({ message: "User signed out successfully." });
    } catch (error) {
        next(error);
    }
};


export const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(new ErrorHandler("User not found", 404)); // Fix: message first, status code second
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const updateUserDetails = async (req, res, next) => {
    if (!req.params.userId) {
        console.log(`Logged in user ID: ${req.user.id}`);
        console.log(`Requested user ID: ${req.params.userId}`);
        return next(new ErrorHandler("You are not allowed to update this user", 403)); 
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(new ErrorHandler("Password must be more than 6 characters", 400)); // Fix: message first, status code second
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(new ErrorHandler("Username must be between 7 and 20 characters", 400)); // Fix: message first, status code second
        }
        if (req.body.username.includes(' ')) {
            return next(new ErrorHandler("Username cannot contain spaces", 400)); // Fix: message first, status code second
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(new ErrorHandler("Username must be Lower case", 400)); // Fix: message first, status code second
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(new ErrorHandler("Username can only contain letters and numbers", 400)); // Fix: message first, status code second
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profileImage: req.body.profileImage,
                password: req.body.password
            }
        }, { new: true });

        console.log(updatedUser);
        

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();

    if (users.length === 0) {
        return next(new ErrorHandler("No User Found", 400)); 
    }

    const usersWithoutPassword = users.map(({ _doc: { password, ...rest } }) => rest);

    res.status(200).json({
        success: true,
        users: usersWithoutPassword
    });
});

export const getSingleUser = async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (!user) {
        return next(new ErrorHandler(`User does not Exist with this ID: ${req.params.userId}`, 404)); // Fix: message first, status code second
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
        success: true,
        user: rest
    });
};

export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const { role } = req.body;
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler(`User not found with ID: ${userId}`, 404)); // Fix: message first, status code second
    }

    user.role = role;
    await user.save();

    res.status(200).json({
        success: true,
        message: "User role updated successfully",
        user
    });
});

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);

        if (!user) {
            return next(new ErrorHandler(`No User exists with this ID: ${req.params.userId}`, 404)); // Fix: message first, status code second
        }

        res.status(200).json("User deleted successfully");
    } catch (error) {
        next(error);
    }
};
