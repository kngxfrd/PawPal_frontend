import { createContext, useContext, useState } from "react";
import { loginUser as apiLogin, register as apiRegister } from "../services/authService";
import type { RegisterPayload } from "../services/auth";

interface User {
  id: number;
  email: string;
  phone_number: string;
  role: "owner" | "groomer";
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (payload: RegisterPayload) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email: string, password: string): Promise<string | null> => {
    try {
      const res = await apiLogin({ email, password });
      setUser(res.user);
      localStorage.setItem("currentUser", JSON.stringify(res.user));
      return null;
    } catch (err: any) {
      return err.response?.data?.message || "Login failed";
    }
  };

  const signup = async (payload: RegisterPayload): Promise<string | null> => {
    try {
      const res = await apiRegister(payload);
      setUser(res.user);
      localStorage.setItem("currentUser", JSON.stringify(res.user));
      return null;
    } catch (err: any) {
      return err.response?.data?.message || "Registration failed";
    }
  };

  

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);