
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/about" element={<About />} />
          <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
          <Route path="/algorithms/logistic-regression" element={<LogisticRegression />} />
          <Route path="/algorithms/decision-tree" element={<DecisionTree />} />
          <Route path="/algorithms/k-nn" element={<KNN />} />
          <Route path="/algorithms/svm" element={<SVM />} />
          <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
