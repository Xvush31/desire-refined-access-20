
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Logo";
import { useAuth } from "../contexts/AuthContext";
import { signInWithGoogle } from "../firebase";
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
    if (loading) return;
    
    setError("");
    setLoading(true);
    
    try {
      console.log("Starting Google signup from Signup page...");
      const result = await signInWithGoogle();
      console.log("Google sign-in result:", result);
      
      if (result.success && result.user) {
        try {
          console.log("Sending data to API for registration...");
          // Register user in your backend
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
          console.log("API response:", data);
          
          if (response.ok) {
            // User registered in backend
            login(result.token, data.role || role, result.user.uid);
            navigate(data.role === "creator" ? "/creator-dashboard" : "/");
            toast.success("Inscription réussie!");
          } else {
            setError(data.error || "Erreur lors de l'inscription");
            toast.error(data.error || "Erreur lors de l'inscription");
          }
        } catch (error) {
          console.error("Error during backend registration:", error);
          setError("Erreur réseau. Veuillez réessayer.");
          toast.error("Erreur réseau. Veuillez réessayer.");
        }
      } else if (result.error) {
        setError(result.error);
        toast.error(result.error);
      }
      
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Erreur lors de la connexion avec Google");
      toast.error("Erreur lors de la connexion avec Google");
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

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute border-t border-border w-full"></div>
            <span className="relative bg-card px-2 text-sm text-muted-foreground">ou</span>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border border-border hover:bg-gray-100"
            onClick={handleGoogleSignup}
            disabled={loading}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            S'inscrire avec Google
          </Button>
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
