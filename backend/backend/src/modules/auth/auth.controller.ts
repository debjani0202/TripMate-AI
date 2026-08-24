import type { Request, Response } from "express";

import {
  loginUser,
  registerUser,
  getUserById,
   updateUserProfile,
    updateProfilePhoto,
} from "./auth.service.js";

import type { AuthenticatedRequest } from "../../middleware/auth.middleware.js";

export const register = async (
  req: Request,
  res: Response,
) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await registerUser({
      fullName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    if (
      error instanceof Error &&
      error.message === "User with this email already exists"
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    console.error("Login error:", error);

    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
export const getMe = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await getUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

export const updateProfile = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      fullName,
      age,
      phone,
      location,
    } = req.body;

    // Basic validation
    if (
      fullName !== undefined &&
      (!fullName || typeof fullName !== "string")
    ) {
      return res.status(400).json({
        success: false,
        message: "Full name must be a valid string",
      });
    }

    if (
      age !== undefined &&
      age !== null &&
      (!Number.isInteger(age) || age < 1 || age > 120)
    ) {
      return res.status(400).json({
        success: false,
        message: "Age must be between 1 and 120",
      });
    }

    const user = await updateUserProfile(
      req.user.userId,
      {
        fullName,
        age,
        phone,
        location,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const updateProfilePhotoController = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required",
      });
    }

    const user = await updateProfilePhoto(
      req.user.userId,
      req.file,
    );

    return res.status(200).json({
      success: true,
      message: "Profile photo updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    console.error("Update profile photo error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile photo",
    });
  }
};