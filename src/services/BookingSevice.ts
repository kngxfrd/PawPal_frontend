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

type LogoutFn = () => void;
let logoutFn: LogoutFn | null = null;
export function registerLogout(fn: LogoutFn) {
  logoutFn = fn;
}

async function safeRequest(url: string, options: RequestInit): Promise<Response> {
  let response = await fetch(url, { ...options, headers: getHeaders() });
  if (response.status === 401) {
    try {
      response = await fetch(url, { ...options, headers: getHeaders() });
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("currentUser");
      if (logoutFn) logoutFn();
      window.location.href = "/login";
    }
  }
  return response;
}

export interface Slot {
  id: number;
  date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
  groomer: number;
  groomer_name?: string;
}

export interface SlotPayload {
  date: string;
  start_time: string;
  end_time: string;
  is_booked?: boolean;
}

export async function getMySlots(): Promise<Slot[]> {
  const res = await safeRequest(`${BASE_URL}booking/slots/`, { method: "GET" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to fetch slots");
  return safeJson(res);
}

export async function getAvailableSlots(): Promise<Slot[]> {
  const res = await safeRequest(`${BASE_URL}booking/available/`, { method: "GET" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to fetch available slots");
  return safeJson(res);
}

export async function createSlot(payload: SlotPayload): Promise<Slot> {
  const res = await safeRequest(`${BASE_URL}booking/slots/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to create slot");
  return safeJson(res);
}

export async function deleteSlot(id: number): Promise<void> {
  const res = await safeRequest(`${BASE_URL}booking/slots/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to delete slot");
}

export interface Booking {
  id: number;
  slot: number;
  slot_date?: string;
  slot_start_time?: string;
  slot_end_time?: string;
  groomer_name?: string;
  pet_name?: string;
  owner_name?: string;
  notes?: string;
  status?: string;
  pet?: number;
}

export interface BookingPayload {
  slot: number;
  pet: number;
  notes?: string;
}

// For pet owners — their own bookings
export async function getMyBookings(): Promise<Booking[]> {
  const res = await safeRequest(`${BASE_URL}booking/bookings/`, { method: "GET" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to fetch bookings");
  return safeJson(res);
}

// For groomers — correct endpoint from API docs
export async function getGroomerBookings(): Promise<Booking[]> {
  const res = await safeRequest(`${BASE_URL}booking/groomer/bookings/`, { method: "GET" });
  if (!res.ok) throw new Error((await safeJson(res)).detail || (await safeJson(res)).message || "Failed to fetch groomer bookings");
  return safeJson(res);
}

export async function createBooking(payload: BookingPayload): Promise<Booking> {
  const res = await safeRequest(`${BASE_URL}booking/bookings/`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await safeJson(res);
    throw new Error(err.message || JSON.stringify(err) || "Failed to create booking");
  }
  return safeJson(res);
}

export async function cancelBooking(id: number): Promise<void> {
  const res = await safeRequest(`${BASE_URL}booking/bookings/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error((await safeJson(res)).message || "Failed to cancel booking");
}
