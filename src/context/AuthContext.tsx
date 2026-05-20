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
  fullName?: string;
  phone?: string;
  location?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (payload: RegisterPayload) => Promise<string | null>;
  updateUser: (updatedFields: Partial<User>) => void;
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
      
      // Merge in any previously saved local profile details for this email
      const savedProfiles = JSON.parse(localStorage.getItem("pawpal_user_profiles") || "{}");
      const localProfile = savedProfiles[email.toLowerCase()] || {};
      
      const mergedUser = {
        ...res.user,
        first_name: res.user.first_name || localProfile.first_name || "",
        last_name: res.user.last_name || localProfile.last_name || "",
        phone_number: res.user.phone_number || localProfile.phone_number || "",
        fullName: localProfile.fullName || `${res.user.first_name || localProfile.first_name || ""} ${res.user.last_name || localProfile.last_name || ""}`.trim(),
        phone: localProfile.phone || res.user.phone_number || localProfile.phone_number || "",
        location: localProfile.location || "",
        bio: localProfile.bio || ""
      };
      
      setUser(mergedUser);
      localStorage.setItem("currentUser", JSON.stringify(mergedUser));
      return null;
    } catch (err: any) {
      return err.response?.data?.message || "Login failed";
    }
  };

  const signup = async (payload: RegisterPayload): Promise<string | null> => {
    try {
      const res = await apiRegister(payload);
      
      // Save profile persistently locally for this email
      const savedProfiles = JSON.parse(localStorage.getItem("pawpal_user_profiles") || "{}");
      const fullName = `${payload.first_name || ""} ${payload.last_name || ""}`.trim();
      savedProfiles[payload.email.toLowerCase()] = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone_number: payload.phone_number,
        fullName: fullName,
        phone: payload.phone_number,
        location: "",
        bio: ""
      };
      localStorage.setItem("pawpal_user_profiles", JSON.stringify(savedProfiles));

      const mergedUser = {
        ...res.user,
        first_name: res.user.first_name || payload.first_name || "",
        last_name: res.user.last_name || payload.last_name || "",
        phone_number: res.user.phone_number || payload.phone_number || "",
        fullName: fullName,
        phone: payload.phone_number
      };
      
      setUser(mergedUser);
      localStorage.setItem("currentUser", JSON.stringify(mergedUser));
      return null;
    } catch (err: any) {
      return err.response?.data?.message || "Registration failed";
    }
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (user) {
      const newUserData = { ...user, ...updatedFields };
      setUser(newUserData);
      localStorage.setItem("currentUser", JSON.stringify(newUserData));
      
      // Sync into the persistent map
      const savedProfiles = JSON.parse(localStorage.getItem("pawpal_user_profiles") || "{}");
      savedProfiles[user.email.toLowerCase()] = {
        ...savedProfiles[user.email.toLowerCase()],
        ...updatedFields,
        first_name: updatedFields.fullName ? updatedFields.fullName.split(' ')[0] : (user.first_name || savedProfiles[user.email.toLowerCase()]?.first_name),
        last_name: updatedFields.fullName ? updatedFields.fullName.split(' ').slice(1).join(' ') : (user.last_name || savedProfiles[user.email.toLowerCase()]?.last_name),
        phone_number: updatedFields.phone || user.phone_number || savedProfiles[user.email.toLowerCase()]?.phone_number,
      };
      localStorage.setItem("pawpal_user_profiles", JSON.stringify(savedProfiles));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);