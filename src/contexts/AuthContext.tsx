
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Mock authentication functions
  const login = async (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    if (email && password) {
      // Mock successful login
      const mockUser = {
        id: "user-123",
        email,
        name: email.split("@")[0],
      };
      
      setUser(mockUser);
      // Navigate to dashboard after login
      navigate("/dashboard");
      return Promise.resolve();
    }
    return Promise.reject("Invalid credentials");
  };

  const signup = async (name: string, email: string, password: string) => {
    // In a real app, this would create a new user in the backend
    if (name && email && password) {
      // Mock successful registration
      console.log("User registered:", { name, email });
      return Promise.resolve();
    }
    return Promise.reject("Please fill all required fields");
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
