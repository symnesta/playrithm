
import React from "react";
import Header from "@/components/Header";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About PlayRithm</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-lg mb-6">
              PlayRithm is an interactive platform designed to help users understand and experiment with machine learning 
              algorithms through visual and interactive exploration.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe that machine learning should be accessible to everyone. Our mission is to demystify 
              complex ML concepts through interactive visualization and hands-on experimentation.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Interactive algorithm playground with real-time parameter tuning</li>
              <li>Visual representation of model decision boundaries and performance metrics</li>
              <li>Multiple pre-loaded datasets suitable for different types of learning problems</li>
              <li>Side-by-side algorithm comparison capabilities</li>
              <li>Personal dashboard to save and revisit experiments</li>
              <li>Custom dataset upload functionality for registered users</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Supported Algorithms</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Linear Regression - for predicting continuous values</li>
              <li>Logistic Regression - for binary classification</li>
              <li>Decision Trees - for classification and regression with interpretable results</li>
              <li>k-Nearest Neighbors - for classification based on proximity</li>
              <li>Support Vector Machines - for finding optimal boundaries between classes</li>
              <li>Neural Networks - for complex pattern recognition</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
            <p>
              Have questions or feedback? We'd love to hear from you!<br />
              Contact us at: <a href="mailto:support@playrithm.ai" className="text-primary hover:underline">support@playrithm.ai</a>
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>
    </div>
  );
};

export default About;
