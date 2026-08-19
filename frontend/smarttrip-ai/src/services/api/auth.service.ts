import apiClient from "./client";

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface RegisterApiResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
  };
}

interface LoginApiResponse {
  success: boolean;
  message: string;
  data: AuthResponse;
}

interface CurrentUserApiResponse {
  success: boolean;
  data: {
    user: AuthUser;
  };
}

export async function registerUser(
  data: RegisterRequest,
): Promise<AuthUser> {
  const response = await apiClient.post<RegisterApiResponse>(
    "/auth/register",
    data,
  );

  return response.data.data.user;
}

export async function loginUser(
  data: LoginRequest,
): Promise<AuthResponse> {
  const response = await apiClient.post<LoginApiResponse>(
    "/auth/login",
    data,
  );

  return response.data.data;
}

export async function getCurrentUser(): Promise<AuthUser> {
  const response =
    await apiClient.get<CurrentUserApiResponse>("/auth/me");

  return response.data.data.user;
}