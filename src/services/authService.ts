import type { RegisterPayload, LoginPayload, AuthResponse } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function safeJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

function saveAuthData(data: AuthResponse) {
  const token = data?.token;
  const role = data?.user?.role;

  if (token) localStorage.setItem("token", token);
  if (role) localStorage.setItem("user_role", role);
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await safeJson(response);
    if (error.detail) throw new Error(error.detail);
    const firstKey = Object.keys(error)[0];
    if (firstKey) throw new Error(`${firstKey}: ${error[firstKey][0]}`);
    throw new Error("Registration failed");
  }

  const data = await safeJson(response);
  saveAuthData(data);  
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await safeJson(response);
    if (error.detail) throw new Error(error.detail);
    const firstKey = Object.keys(error)[0];
    if (firstKey) throw new Error(`${error[firstKey][0]}`);
    throw new Error("Login failed");
  }

  const data = await safeJson(response);
  saveAuthData(data);  
  return data;
}