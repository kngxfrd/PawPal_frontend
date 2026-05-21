const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function safeJson(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : {};
}

async function safeRequest(url: string, options: RequestInit): Promise<Response> {
  const response = await fetch(url, { ...options, headers: getHeaders() });
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  return response;
}

export interface Groomer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  bio?: string;
  location?: string;
  avatar?: string;
}

export async function getAllGroomers(): Promise<Groomer[]> {
  const res = await safeRequest(`${BASE_URL}auth/groomers/`, { method: "GET" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to fetch groomers");
  const data = await safeJson(res);
  
  return Array.isArray(data) ? data : data.groomers ?? [];
}
