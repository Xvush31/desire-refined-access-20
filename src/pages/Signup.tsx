import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

// Define the shape of the AuthContext for TypeScript
interface AuthContextType {
  login: (token: string, role: string) => void;
  currentUser: { role: string } | null;
  loading: boolean;
}

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-puce-rho-15.vercel.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.role);
        setEmail("");
        setPassword("");
        setRole("user");
        navigate(data.role === "creator" ? "/creator-dashboard" : "/");
      } else {
        setError(data.error || "Erreur lors de l’inscription");
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
    window.location.href = `https://backend-puce-rho-15.vercel.app/api/auth/google?role=${role}`;
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold">Inscrivez-vous</h1>
          <p className="text-muted-foreground mt-2">
            Créez un compte pour commencer.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleSignup}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Rôle
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border border-border rounded-md"
              >
                <option value="user">Utilisateur</option>
                <option value="creator">Créateur</option>
              </select>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Inscription..." : "S’inscrire"}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() =>
                setError("Erreur lors de la connexion avec Google")
              }
              text="signup_with"
              width="100%"
            />
            <Button
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={handleAppleSignIn}
            >
              Continuer avec Apple
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="font-medium text-brand-accent hover:underline"
          >
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
