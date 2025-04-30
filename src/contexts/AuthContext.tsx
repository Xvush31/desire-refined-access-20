
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";

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

  useEffect(() => {
    // Check local storage first for stored auth data
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const uid = localStorage.getItem("uid");
    if (token && role && uid) {
      setCurrentUser({ token, role, uid });
    }
    
    // Then set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        // If Firebase auth has a user but we don't have local storage data,
        // update with Firebase user data
        if (!currentUser) {
          const token = await user.getIdToken();
          const role = localStorage.getItem("role") || "user";
          const uid = user.uid;
          setCurrentUser({ token, role, uid });
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("uid", uid);
        }
      } else if (!user && currentUser) {
        // If Firebase has no user but we have local storage data,
        // clear the local data
        logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
