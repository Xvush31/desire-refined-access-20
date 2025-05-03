
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: { token: string; role: string; uid: string; photoURL?: string } | null;
  login: (token: string, role: string, uid: string, photoURL?: string) => void;
  logout: () => void;
  loading: boolean;
}

// Create context with a meaningful default value for better debugging
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  login: () => console.warn("AuthProvider not initialized"),
  logout: () => console.warn("AuthProvider not initialized"),
  loading: true
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<{
    token: string;
    role: string;
    uid: string;
    photoURL?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider initialized, setting up auth state listener");
    // Check local storage first for stored auth data
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const uid = localStorage.getItem("uid");
    const photoURL = localStorage.getItem("photoURL");
    
    if (token && role && uid) {
      console.log("Found auth data in localStorage, restoring session");
      setCurrentUser({ token, role, uid, photoURL: photoURL || undefined });
    }
    
    // Then set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      console.log("Firebase auth state changed:", user ? "User authenticated" : "No user");
      
      try {
        if (user) {
          // If Firebase auth has a user but we don't have local storage data,
          // update with Firebase user data
          const token = await user.getIdToken();
          const role = localStorage.getItem("role") || "user";
          const uid = user.uid;
          const photoURL = user.photoURL || undefined;
          console.log("Setting current user from Firebase auth with uid:", uid);
          
          setCurrentUser({ token, role, uid, photoURL });
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("uid", uid);
          if (photoURL) {
            localStorage.setItem("photoURL", photoURL);
          }
        } else if (!user) {
          // If Firebase has no user, clear local storage data if it exists
          if (localStorage.getItem("token")) {
            console.log("No Firebase user but found local data, logging out");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("uid");
            localStorage.removeItem("photoURL");
            setCurrentUser(null);
          }
        }
      } catch (error) {
        console.error("Error in auth state change handler:", error);
        // Don't set currentUser to null here to prevent logout on temporary errors
      } finally {
        // Always set loading to false once we've processed the auth state
        setLoading(false);
      }
    });

    return () => {
      console.log("Cleaning up auth state listener");
      unsubscribe();
    };
  }, []);

  const login = (token: string, role: string, uid: string, photoURL?: string) => {
    console.log("Login called, setting user data with uid:", uid);
    setCurrentUser({ token, role, uid, photoURL });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("uid", uid);
    if (photoURL) {
      localStorage.setItem("photoURL", photoURL);
    }
  };

  const logout = () => {
    console.log("Logout called, clearing user data");
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("uid");
    localStorage.removeItem("photoURL");
    auth.signOut().catch(err => {
      console.error("Error during sign out:", err);
      toast.error("Error during logout");
    });
  };

  // Provide the context value
  const contextValue: AuthContextType = {
    currentUser,
    login,
    logout,
    loading
  };

  console.log("AuthProvider rendering, loading:", loading, "user:", currentUser ? "authenticated" : "not authenticated");

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error("useAuth was called outside of AuthProvider. Check your component hierarchy.");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
