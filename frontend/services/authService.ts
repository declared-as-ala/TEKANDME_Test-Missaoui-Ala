import API from "./api";

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    id: string;
  };
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export const registerUser = async (
  email: string,
  password: string
): Promise<RegisterResponse> => {
  const res = await API.post<RegisterResponse>("/auth/register", {
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const res = await API.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
};
