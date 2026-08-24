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
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
  age: number | null;
  phone: string | null;
  location: string | null;
  profilePhoto: string | null;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}
export interface UpdateProfileRequest {
  fullName?: string;
  age?: number | null;
  phone?: string | null;
  location?: string | null;
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


export async function updateProfile(
  data: UpdateProfileRequest,
): Promise<AuthUser> {
  const response = await apiClient.patch<{
    success: boolean;
    message: string;
    data: {
      user: AuthUser;
    };
  }>("/auth/profile", data);

  return response.data.data.user;
}

export async function updateProfilePhoto(
  photo: File,
): Promise<AuthUser> {
  const formData = new FormData();

  formData.append("photo", photo);

  const response = await apiClient.patch<{
    success: boolean;
    message: string;
    data: {
      user: AuthUser;
    };
  }>("/auth/profile/photo", formData);

  return response.data.data.user;
}