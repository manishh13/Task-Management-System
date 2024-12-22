import User from "../models/userModel.js";

import { createJWT } from "../utils/index.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });

    if (user) {
      isAdmin ? createJWT(res, user._id) : null;
      user.password = undefined;
      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "invalid user data",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    const isMatch = await user.matchPassword(password);

    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined;
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "email and password do not match",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    let data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let data = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getusername = async (req, res) => {
  try {
    let data = await User.findById(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
