
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, BookOpen, User, Save, Share, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  
  const isAlgorithmPage = location.pathname.includes("/algorithms/");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  
  // Always show algorithms in the navigation menu
  const showAlgorithms = true;

  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <Link to="/" className="text-primary font-bold text-2xl mr-2">
          <span className="text-white">Play</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-visualization-purple">Rithm</span>
        </Link>
        
        <div className="hidden sm:flex px-2 py-1 bg-muted text-xs rounded-full">
          Beta
        </div>
      </div>
      
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/getting-started" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Getting Started
            </Link>
          </NavigationMenuItem>
          
          {showAlgorithms && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {[
                    { name: "Linear Regression", description: "Predict continuous values based on linear relationships", path: "/algorithms/linear-regression" },
                    { name: "Logistic Regression", description: "Binary classification model", path: "/algorithms/logistic-regression" },
                    { name: "Decision Tree", description: "Tree-based decision making model", path: "/algorithms/decision-tree" },
                    { name: "k-NN", description: "k-Nearest Neighbors classification algorithm", path: "/algorithms/k-nn" },
                    { name: "SVM", description: "Support Vector Machine for classification tasks", path: "/algorithms/svm" },
                    { name: "Neural Network", description: "Multi-layer perceptron for complex patterns", path: "/algorithms/neural-network" }
                  ].map((algo) => (
                    <li key={algo.name}>
                      <Link
                        to={algo.path}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div className="text-sm font-medium leading-none">{algo.name}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          {algo.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          
          <NavigationMenuItem>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex gap-2">
        {isLoggedIn ? (
          <>
            {/* Show Dashboard button only when on an algorithm, getting started, or about page */}
            {(isAlgorithmPage || location.pathname === "/getting-started" || location.pathname === "/about") && (
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            )}
            
            <Button variant="default" size="sm" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </>
        ) : (
          <>
            {/* Only show login/signup when not on auth pages */}
            {!isAuthPage && (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
