import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { createToken } from "../utils/createToken.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { ErrorHandler } from "../middleware/error.js";
import mongoose from "mongoose";

export const signUp = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(ErrorHandler(400, "All fields are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(ErrorHandler(400, "Email already exists"));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Sign Up successfully");
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; 
      return next(
        ErrorHandler(
          400,
          `The ${duplicateField} is already taken. Please choose another.`
        )
      );
    }
    next(error);
  }
});

export const signIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(ErrorHandler(400, "Email or password is required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(ErrorHandler(401, "Invalid Email or Password"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(ErrorHandler(401, "Invalid Email or Password"));
    }

    const token = createToken(validUser.email, validUser._id, validUser.role);

    const { password: pass, ...rest } = validUser._doc;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ token, user: rest });
  } catch (error) {
    next(error);
  }
});

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({ message: "User signed out successfully." });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId); 

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      success: true,
      user: user,
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching user details', 
      error: error.message 
    }); 
  }
};



export const updateUserDetails = async (req, res, next) => {
  if (!req.params.userId) {
    return next(ErrorHandler(403, "You are not allowed to update this user"));
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return next(ErrorHandler(400, "Invalid User ID"));
  }

  // if (req.body.password) {
  //   if (req.body.password.length < 6) {
  //     return next(ErrorHandler(400, "Password must be more than 6 characters"));
  //   }
  //   req.body.password = bcryptjs.hashSync(req.body.password, 10);
  // }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        ErrorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    // if (req.body.username.includes(" ")) {
    //   return next(ErrorHandler(400, "Username cannot contain spaces"));
    // }
    // if (req.body.username !== req.body.username.toLowerCase()) {
    //   return next(ErrorHandler(400, "Username must be lowercase"));
    // }
    // if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
    //   return next(
    //     ErrorHandler(400, "Username can only contain letters and numbers")
    //   );
    // }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profileImage: req.body.profileImage,
          // password: req.body.password,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return next(ErrorHandler(404, "User not found"));
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      ErrorHandler(403, "You are not allowed to get Products Reviews")
    );
  }

  const users = await User.find();

  if (users.length === 0) {
    return next(ErrorHandler(400, "No User Found"));
  }

  const usersWithoutPassword = users.map(
    ({ _doc: { password, ...rest } }) => rest
  );

  res.status(200).json({
    success: true,
    users: usersWithoutPassword,
  });
});

export const getSingleUser = async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      ErrorHandler(
        404,
        `User does not Exist with this ID: ${req.params.userId}`
      )
    );
  }

  const { password, ...rest } = user._doc;

  res.status(200).json({
    success: true,
    user: rest,
  });
};

export const updateUserRole = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  const userId = req.params.userId;

  if (!req.user || req.user.role !== "admin") {
    return next(
      ErrorHandler(403, "You are not allowed to get Products Reviews")
    );
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(ErrorHandler(404, `User not found with ID: ${userId}`));
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
});

export const deleteUser = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return next(
        ErrorHandler(403, "You are not allowed to get Products Reviews")
      );
    }

    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return next(
        ErrorHandler(404, `No User exists with this ID: ${req.params.userId}`)
      );
    }

    res.status(200).json("User deleted successfully");
  } catch (error) {
    next(error);
  }
};
