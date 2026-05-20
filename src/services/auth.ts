export interface RegisterPayload {
  email: string;
  phone_number: string;
  password: string;
  role: "owner" | "groomer";
  first_name: string;
  last_name: string;
  password_confirm: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    phone_number: string;
    role: "owner" | "groomer";
    first_name: string;
    last_name: string;
  };
}