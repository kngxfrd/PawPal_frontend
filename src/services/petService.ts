export interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: number;
  special_notes: string;
}

export interface PetPayload {
  name: string;
  type: string;
  breed: string;
  age: number;
  special_notes: string;
}

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
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch (err) {
    return { detail: "Server returned a non-JSON response (likely an HTML error page)." };
  }
}

async function safeRequest(url: string, options: RequestInit): Promise<any> {
  let response = await fetch(url, { ...options, headers: getHeaders() });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  if (!response.ok) {
    const error = await safeJson(response);
    throw new Error(error.message || error.detail || `Request failed with status ${response.status}`);
  }

  return await safeJson(response);
}

export async function getPets(): Promise<Pet[]> {
  const data = await safeRequest(`${BASE_URL}registry/pets/`, { method: "GET" });
  return data.pets ? data.pets : (Array.isArray(data) ? data : []);
}

export async function createPet(payload: PetPayload): Promise<Pet> {
  const data = await safeRequest(`${BASE_URL}registry/pets/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return data.pet ? data.pet : data;
}

export async function updatePet(id: number, payload: Partial<PetPayload>): Promise<Pet> {
  const data = await safeRequest(`${BASE_URL}registry/pets/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  return data.pet ? data.pet : data;
}

export async function deletePet(id: number): Promise<void> {
  await safeRequest(`${BASE_URL}registry/pets/${id}/`, {
    method: "DELETE",
  });
}
