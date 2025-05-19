
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Auth protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

// Guest only route - for redirecting logged in users away from guest pages
const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return <>{children}</>;
};

// Guest playground route - for redirecting guests to Linear Regression
const GuestPlaygroundRoute = () => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return <Navigate to="/algorithms/linear-regression" />;
};

const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/getting-started" element={<GettingStarted />} />
      <Route path="/about" element={<About />} />
      
      {/* Auth routes */}
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><Signup /></GuestRoute>} />
      
      {/* Dashboard - protected route */}
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      
      {/* Algorithm routes - accessible by all, but with limited features for guests */}
      <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
      <Route path="/algorithms/logistic-regression" element={<LogisticRegression />} />
      <Route path="/algorithms/decision-tree" element={<DecisionTree />} />
      <Route path="/algorithms/k-nn" element={<KNN />} />
      <Route path="/algorithms/svm" element={<SVM />} />
      <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
      
      {/* Start playground - redirects guests to Linear Regression, logged in users to Dashboard */}
      <Route path="/start-playground" element={<GuestPlaygroundRoute />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

// Restructured App component to fix the TooltipProvider issue
const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* Correctly placed TooltipProvider as a functional component wrapper */}
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
