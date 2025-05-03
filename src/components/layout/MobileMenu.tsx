import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  children?: React.ReactNode;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ children }) => {
  const { currentUser, logout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 pt-6">
        <div className="grid gap-4 py-4">
          <div className="px-4 py-2">
            <Button asChild variant="ghost" className="w-full justify-start font-normal">
              <Link to="/">Home</Link>
            </Button>
          </div>
          <div className="px-4 py-2">
            <Button asChild variant="ghost" className="w-full justify-start font-normal">
              <Link to="/search">Search</Link>
            </Button>
          </div>
          <div className="px-4 py-2">
            <Button asChild variant="ghost" className="w-full justify-start font-normal">
              <Link to="/explore">Explore</Link>
            </Button>
          </div>
          {currentUser ? (
            <>
              <div className="px-4 py-2">
                <Button asChild variant="ghost" className="w-full justify-start font-normal">
                  <Link to="/settings">Settings</Link>
                </Button>
              </div>
              <div className="px-4 py-2">
                <Button asChild variant="ghost" className="w-full justify-start font-normal">
                  <Link to="/messages">Messages</Link>
                </Button>
              </div>
              <div className="px-4 py-2">
                <Button variant="ghost" className="w-full justify-start font-normal" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-2">
                <Button asChild variant="ghost" className="w-full justify-start font-normal">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
              <div className="px-4 py-2">
                <Button asChild variant="ghost" className="w-full justify-start font-normal">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
