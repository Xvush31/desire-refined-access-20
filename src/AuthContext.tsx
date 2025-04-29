
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase"; // Fixed import path
import { onAuthStateChanged, User } from "firebase/auth";

interface AuthContextType {
  currentUser: { token: string; role: string; uid: string } | null;
  login: (token: string, role: string, uid: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<{
    token: string;
    role: string;
    uid: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (token: string, role: string, uid: string) => {
    setCurrentUser({ token, role, uid });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("uid", uid);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("uid");
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        const uid = user.uid;
        const token = localStorage.getItem("token") || "";
        const role = localStorage.getItem("role") || "user";
        setCurrentUser({ token, role, uid });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
