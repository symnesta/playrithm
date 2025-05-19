
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LinearRegression from "./pages/algorithms/LinearRegression";
import LogisticRegression from "./pages/algorithms/LogisticRegression";
import DecisionTree from "./pages/algorithms/DecisionTree";
import KNN from "./pages/algorithms/KNN";
import SVM from "./pages/algorithms/SVM";
import NeuralNetwork from "./pages/algorithms/NeuralNetwork";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import GettingStarted from "./pages/GettingStarted";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

const queryClient = new QueryClient();

// Auth protected route component
const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  
  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return <Outlet />;
};

// Guest only route - for redirecting logged in users away from guest pages
const GuestRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();
  
  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/getting-started" element={<GettingStarted />} />
      <Route path="/about" element={<About />} />
      
      {/* Auth routes - guest only */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      
      {/* Algorithm routes - accessible by all, but with limited features for guests */}
      <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
      <Route path="/algorithms/logistic-regression" element={<LogisticRegression />} />
      <Route path="/algorithms/decision-tree" element={<DecisionTree />} />
      <Route path="/algorithms/k-nn" element={<KNN />} />
      <Route path="/algorithms/svm" element={<SVM />} />
      <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
      
      {/* Start playground route - redirects guests to Linear Regression, logged in users to Dashboard */}
      <Route path="/start-playground" element={<Navigate to="/algorithms/linear-regression" />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Main App component 
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
