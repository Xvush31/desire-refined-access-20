import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

// Define the shape of the AuthContext for TypeScript
interface AuthContextType {
  login: (token: string, role: string) => void;
  currentUser: { role: string } | null;
  loading: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth() as AuthContextType;

  // Load Apple Sign-In SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.AppleID.auth.init({
        clientId: process.env.APPLE_CLIENT_ID || "",
        scope: "email",
        redirectURI:
          "https://backend-puce-rho-15.vercel.app/api/auth/apple/callback",
        usePopup: true,
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        login(data.token, data.role);
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

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    window.location.href =
      "https://backend-puce-rho-15.vercel.app/api/auth/google?role=user";
  };

  const handleAppleSignIn = async () => {
    try {
      await window.AppleID.auth.signIn();
      // The backend handles the redirect to /auth/callback
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
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError("Erreur lors de la connexion avec Google")}
            text="signin_with"
            width="100%"
          />
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
