import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";
import { uploadProfilePhotoToCloudinary } from "./profile-photo.service.js";

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

// Register a new user
export const registerUser = async (input: RegisterInput) => {
  const { fullName, email, password } = input;

  const normalizedEmail = email.trim().toLowerCase();

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

// Login an existing user
export const loginUser = async (input: LoginInput) => {
  const { email, password } = input;

  const normalizedEmail = email.trim().toLowerCase();

  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare password with hashed password
  const passwordMatches = await bcrypt.compare(
    password,
    user.password,
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password");
  }

  // Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  return {
    token,
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  };
};

// Get profile of the authenticated user
export const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};

interface UpdateProfileInput {
  fullName?: string;
  age?: number | null;
  phone?: string | null;
  location?: string | null;
}

// Update profile of the authenticated user
export const updateUserProfile = async (
  userId: number,
  input: UpdateProfileInput,
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...(input.fullName !== undefined && {
        fullName: input.fullName.trim(),
      }),

      ...(input.age !== undefined && {
        age: input.age,
      }),

      ...(input.phone !== undefined && {
        phone: input.phone?.trim() || null,
      }),

      ...(input.location !== undefined && {
        location: input.location?.trim() || null,
      }),
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      age: true,
      phone: true,
      location: true,
      profilePhoto: true,
    },
  });

  return user;
};


export const updateProfilePhoto = async (
  userId: number,
  file: Express.Multer.File,
) => {
  const photoUrl = await uploadProfilePhotoToCloudinary(
    file,
    userId,
  );

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      profilePhoto: photoUrl,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
      age: true,
      phone: true,
      location: true,
      profilePhoto: true,
    },
  });

  return user;
};