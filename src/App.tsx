
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
            <Route path="/algorithms/logistic-regression" element={<LogisticRegression />} />
            <Route path="/algorithms/decision-tree" element={<DecisionTree />} />
            <Route path="/algorithms/k-nn" element={<KNN />} />
            <Route path="/algorithms/svm" element={<SVM />} />
            <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
