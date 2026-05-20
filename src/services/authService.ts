import type { RegisterPayload, LoginPayload, AuthResponse } from "./auth"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function safeJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
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
    console.log("Register response:", JSON.stringify(data));  
 const token = data?.access || data?.tokens?.access || data?.token;
  const refresh = data?.refresh || data?.tokens?.refresh;

  if (token) {

    if (refresh) localStorage.setItem("refresh", refresh);
    console.log("Saved token:", localStorage.getItem("token"));  
  } else {
    console.log("No token found in response!"); 
  }

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
  console.log("Login response:", JSON.stringify(data)); 

  const token = data?.tokens?.access;
  const refresh = data?.tokens?.refresh || data?.refresh;

  if (token) {
    localStorage.setItem("token", token);
    if (refresh) localStorage.setItem("refresh", refresh);
    console.log("Saved token:", localStorage.getItem("token"));  
  }

  return data;
}