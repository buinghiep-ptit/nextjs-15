import { LoginRequest, LoginResponse } from "@/types/auth.type";
import axiosInstance from "@/lib/axios";

const AUTH_URL = "/auth";

export const login = async (data: LoginRequest) => {
  const response = await axiosInstance.post<LoginResponse>(
    `${AUTH_URL}/login/manager`,
    data
  );
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axiosInstance.post(`${AUTH_URL}/refresh`, {
    refresh_token: refreshToken,
  });
  return response.data;
};

export const getMe = async () => {
  const response = await axiosInstance.get(`${AUTH_URL}/profile`);
  return response.data;
};
