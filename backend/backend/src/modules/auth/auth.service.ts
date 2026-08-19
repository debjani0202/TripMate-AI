import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma.js";

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