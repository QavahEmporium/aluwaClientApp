"use client";

import { logoutSessionUser } from "@/actions/user";
import { getSessionUser } from "@/data/user";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  user: any | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const updateSessionUser = async () => {
    const storedUser = await getSessionUser();
    if (storedUser) {
      setUser(storedUser);
    }
  };
  
  useEffect(() => {
    updateSessionUser();
  }, []);

  const login = () => {
    updateSessionUser();
  };

  const logout = async () => {
    setUser(null);
    await logoutSessionUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
