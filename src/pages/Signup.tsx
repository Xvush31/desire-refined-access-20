
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { signInWithGoogle, getGoogleRedirectResult } from "../firebase";
import { toast } from "sonner";

// Update the AuthContextType interface to match the actual implementation
interface AuthContextType {
  login: (token: string, role: string, uid: string) => void;
  currentUser: { role: string; uid: string } | null;
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
  
  // Check for Google redirect result when component mounts
  useEffect(() => {
    const checkRedirectResult = async () => {
      setLoading(true);
      const result = await getGoogleRedirectResult();
      
      if (result.success && result.user) {
        try {
          // Enregistrer l'utilisateur dans votre backend
          const response = await fetch(
            `https://backend-puce-rho-15.vercel.app/api/auth/signup-google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                role: role
              }),
            }
          );
          
          const data = await response.json();
          
          if (response.ok) {
            // Utilisateur enregistré dans le backend
            login(result.token, data.role || role, result.user.uid);
            navigate(data.role === "creator" ? "/creator-dashboard" : "/");
            toast.success("Inscription réussie!");
          } else {
            setError(data.error || "Erreur lors de l'inscription");
            toast.error(data.error || "Erreur lors de l'inscription");
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement avec le backend:", error);
          setError("Erreur réseau. Veuillez réessayer.");
          toast.error("Erreur réseau. Veuillez réessayer.");
        }
      } else if (result.error) {
        setError(result.error);
      }
      
      setLoading(false);
    };

    checkRedirectResult();
  }, [login, navigate, role]);

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
        login(data.token, data.role, data.uid || "");
        setEmail("");
        setPassword("");
        setRole("user");
        navigate(data.role === "creator" ? "/creator-dashboard" : "/");
        toast.success("Inscription réussie!");
      } else {
        setError(data.error || "Erreur lors de l'inscription");
        toast.error(data.error || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setError("Erreur réseau. Veuillez réessayer.");
      toast.error("Erreur réseau. Veuillez réessayer.");
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    
    try {
      // Cette fonction effectue une redirection, donc pas besoin de gérer le résultat ici
      await signInWithGoogle();
      // Le useEffect s'occupera de gérer le résultat après la redirection
    } catch (error) {
      setError("Erreur lors de la connexion avec Google");
      toast.error("Erreur lors de la connexion avec Google");
      console.error("Google sign-in error:", error);
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
              {loading ? "Inscription..." : "S'inscrire"}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <Button
              className="w-full bg-[#4285F4] text-white hover:bg-[#3367d6] flex items-center justify-center gap-2"
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="white" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
              </svg>
              S'inscrire avec Google
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
