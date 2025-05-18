
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const GettingStarted = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Getting Started with PlayRithm</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">
              Welcome to PlayRithm! This guide will help you get started with our interactive 
              machine learning playground.
            </p>
            
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
              <ol className="list-decimal pl-6 space-y-4">
                <li>
                  <strong>Select an Algorithm:</strong> Choose from our selection of machine learning 
                  algorithms in the navigation menu.
                </li>
                <li>
                  <strong>Choose a Dataset:</strong> Each algorithm page offers datasets appropriate 
                  for that specific algorithm.
                </li>
                <li>
                  <strong>Adjust Parameters:</strong> Use the sliders and controls to modify the algorithm's 
                  hyperparameters.
                </li>
                <li>
                  <strong>Observe Visualizations:</strong> Watch how your changes affect the model's 
                  decision boundary and performance metrics.
                </li>
                <li>
                  <strong>Save Your Results:</strong> Create an account to save your experiments and 
                  upload custom datasets.
                </li>
              </ol>
              
              <div className="mt-6">
                <Button asChild>
                  <Link to="/algorithms/linear-regression">
                    Start Experimenting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Understanding the Interface</h2>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Main Canvas</h3>
            <p>
              The central area of each algorithm page displays the data points and, where applicable, 
              the decision boundary of your model. As you adjust parameters, you'll see this 
              visualization update in real-time.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Parameter Controls</h3>
            <p>
              Each algorithm has specific parameters that can be tuned. These controls allow you 
              to experiment with different settings and observe their effects on model performance.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Performance Metrics</h3>
            <p>
              Track how well your model is performing with metrics such as accuracy, precision, 
              recall, F1 score, or R-squared, depending on the type of algorithm.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Dataset Selection</h3>
            <p>
              Choose from pre-loaded datasets or, if you're a registered user, upload your own 
              datasets to use with the algorithms.
            </p>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to dive in?</h3>
              <Button size="lg" asChild>
                <Link to="/algorithms/linear-regression">
                  Go to Linear Regression
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
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

export default GettingStarted;
