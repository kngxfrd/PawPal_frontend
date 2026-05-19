import { createContext, useContext, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: "pet_owner" | "groomer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: "pet_owner" | "groomer") => string | null;
  signup: (fullName: string, email: string, password: string, role: "pet_owner" | "groomer") => string | null;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string, role: "pet_owner" | "groomer") => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password && u.role===role);
    if (!found) return "Invalid email or password";
    localStorage.setItem("currentUser", JSON.stringify(found));
    setUser(found);
    return null;
  };

  const signup = (fullName: string, email: string, password: string, role: "pet_owner" | "groomer") => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) return "Email already exists";
    const newUser: User = { id: crypto.randomUUID(), fullName, email, password, role };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setUser(newUser);
    return null;
  };

  const signOut = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);