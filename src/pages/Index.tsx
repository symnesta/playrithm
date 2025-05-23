import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-white">Welcome to </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-visualization-purple">PlayRithm</span>
          </h1>
          
          <p className="text-xl mb-8 text-muted-foreground">
            Interactive machine learning playground for experimenting with algorithms,
            visualizing results, and understanding how ML models work.
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2 max-w-xl mx-auto">
            <Button size="lg" asChild className="start-playground-btn">
              {isLoggedIn ? (
                <Link to="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <Link to="/algorithms/linear-regression">
                  Start Playground
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </Button>
            
            <Button size="lg" variant="outline" asChild className="learn-more-btn">
              <Link to="/getting-started">Learn How It Works</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid gap-8 md:grid-cols-3 feature-cards">
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">Experiment</h3>
              <p className="text-muted-foreground">
                Adjust parameters in real-time and see how they affect model performance.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">Visualize</h3>
              <p className="text-muted-foreground">
                See decision boundaries, loss curves, and model internals as they evolve.
              </p>
            </div>
            
            <div className="p-6 rounded-lg border border-border bg-card">
              <h3 className="text-xl font-semibold mb-3">Learn</h3>
              <p className="text-muted-foreground">
                Understand the inner workings of ML algorithms through interactive exploration.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>
    </div>
  );
};

export default Index;
