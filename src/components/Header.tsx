
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogIn,
  LogOut,
  Menu,
  User,
  ChevronDown,
  Home,
  BookOpen,
  BarChart4,
  LineChart,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import UserGuideButton from "./UserGuideButton";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="mr-6 flex items-center gap-2 font-semibold">
          <BarChart4 className="h-6 w-6" />
          <span className="hidden sm:inline">PlayRithm</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/" className="hidden sm:inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link to="/getting-started" className="hidden sm:inline-flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Getting Started
          </Link>
          <Link to="/about" className="hidden sm:inline-flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            About
          </Link>
        </nav>
        
        <div className="ml-auto flex items-center gap-2">
          <UserGuideButton className="mr-2" />
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-4 w-4" />
                  <ChevronDown className="absolute bottom-1 right-1 h-3 w-3 opacity-70" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    <span>{user?.email}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {!isMobile && (
                <>
                  <Link to="/login">
                    <Button variant="outline">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </>
          )}

          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && showMobileMenu && (
        <div className="border-b bg-background pb-4">
          <Separator />
          <div className="container flex flex-col gap-4 px-4 py-4">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/getting-started" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Getting Started
            </Link>
            <Link to="/about" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              About
            </Link>
            <Separator />
            {!isLoggedIn ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <User className="mr-2 h-4 w-4" />
                  {user?.email}
                </Link>
                <Button variant="outline" className="w-full" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
