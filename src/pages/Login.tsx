import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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
        navigate(data.role === "creator" ? "/creator-dashboard" : "/");
      } else {
        setError(data.error || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur réseau. Veuillez réessayer.");
      console.error("Erreur réseau:", error);
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
            style={{
              padding: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "4px",
              border: "none",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Se connecter
          </button>
        </form>
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
