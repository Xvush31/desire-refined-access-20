
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Logo from "@/components/Logo";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold">Connectez-vous à votre compte</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue. Veuillez vous connecter pour continuer.
          </p>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="votre@email.com" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Mot de passe</label>
                <Link to="/forgot-password" className="text-xs text-brand-accent hover:underline">
                  Mot de passe oublié?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            
            <div className="flex items-center">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="ml-2 text-sm">
                Se souvenir de moi
              </label>
            </div>
            
            <Button type="submit" className="w-full">
              Se connecter
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Continuer avec Google
            </Button>
            <Button variant="outline" className="w-full">
              Continuer avec Apple
            </Button>
          </div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte?{" "}
          <Link to="/signup" className="font-medium text-brand-accent hover:underline">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
