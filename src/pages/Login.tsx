
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInWithGoogle } from "../firebase";
import { toast } from "sonner";
import Logo from "@/components/Logo";

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
        toast.success("Connexion réussie!");
      } else {
        setError(data.error || "Email ou mot de passe incorrect");
        toast.error(data.error || "Email ou mot de passe incorrect");
      }
    } catch (error) {
      setError("Erreur réseau. Veuillez réessayer.");
      toast.error("Erreur réseau. Veuillez réessayer.");
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
        try {
          // Vérifier si l'utilisateur existe dans votre backend
          const response = await fetch(
            `https://backend-puce-rho-15.vercel.app/api/auth/verify-google-user`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName
              }),
            }
          );
          
          const data = await response.json();
          
          if (response.ok) {
            // Utilisateur vérifié dans le backend
            login(result.token, data.role || "user", result.user.uid);
            navigate(data.role === "creator" ? "/creator-dashboard" : "/");
            toast.success("Connexion réussie!");
          } else {
            setError(data.error || "Erreur lors de la vérification de l'utilisateur");
            toast.error(data.error || "Erreur lors de la vérification de l'utilisateur");
          }
        } catch (error) {
          console.error("Erreur lors de la vérification avec le backend:", error);
          setError("Erreur réseau. Veuillez réessayer.");
          toast.error("Erreur réseau. Veuillez réessayer.");
        }
      } else if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
      
    } catch (error) {
      setError("Erreur lors de la connexion avec Google");
      toast.error("Erreur lors de la connexion avec Google");
      console.error("Google sign-in error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold">Connectez-vous</h1>
          <p className="text-muted-foreground mt-2">
            Accédez à votre compte.
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form className="space-y-6" onSubmit={handleLogin}>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <Button
              className="w-full bg-[#4285F4] text-white hover:bg-[#3367d6] flex items-center justify-center gap-2"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="white" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              Se connecter avec Google
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link
            to="/signup"
            className="font-medium text-brand-accent hover:underline"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
