
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "../firebase";

interface AuthContextType {
  login: (token: string, role: string, uid: string) => void;
  currentUser: { role: string; uid: string } | null;
  loading: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth() as AuthContextType;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-puce-rho-15.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.role, data.uid || "");
        setEmail("");
        setPassword("");
        navigate(data.role === "creator" ? "/creator-dashboard" : "/");
      } else {
        setError(data.error || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur réseau. Veuillez réessayer.");
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    
    try {
      const result = await signInWithGoogle();
      
      if (result.success && result.user) {
        const idToken = await result.user.getIdToken();
        
        // Vous pouvez envoyer ce token à votre backend pour vérification et récupérer le rôle
        // Ici, on définit un rôle par défaut de "user"
        const role = "user";
        
        login(idToken, role, result.user.uid);
        navigate("/");
      } else {
        setError(result.error || "Erreur lors de la connexion avec Google");
      }
    } catch (error) {
      setError("Erreur lors de la connexion avec Google");
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      // Pour simplifier sans dépendre de window.AppleID qui peut causer des erreurs
      alert("La connexion avec Apple n'est pas encore disponible");
      
      // Si vous souhaitez implémenter Apple Sign-In plus tard
      // await window.AppleID.auth.signIn();
    } catch (error) {
      setError("Erreur lors de la connexion avec Apple");
      console.error("Apple Sign-In error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f3f4f6",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "32px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "16px",
          }}
        >
          Connectez-vous
        </h1>
        {error && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "16px" }}
          >
            {error}
          </p>
        )}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="email"
              style={{ fontSize: "0.875rem", fontWeight: "medium" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                outline: "none",
                fontSize: "1rem",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "0.875rem", fontWeight: "medium" }}
            >
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                outline: "none",
                fontSize: "1rem",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "8px",
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
              color: "white",
              borderRadius: "4px",
              border: "none",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#4285F4",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="white" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
            </svg>
            Se connecter avec Google
          </Button>
          
          <Button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={handleAppleSignIn}
          >
            Continuer avec Apple
          </Button>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            marginTop: "16px",
          }}
        >
          Pas encore de compte ?{" "}
          <Link
            to="/signup"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
