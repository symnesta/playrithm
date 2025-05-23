
import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface GuideStep {
  target: string;
  title: string;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface PageGuide {
  [path: string]: GuideStep[];
}

interface UserGuideContextType {
  activeStep: number;
  setActiveStep: (step: number) => void;
  isGuideActive: boolean;
  startGuide: () => void;
  nextStep: () => void;
  skipGuide: () => void;
  currentPageGuide: GuideStep[];
}

const UserGuideContext = createContext<UserGuideContextType | undefined>(undefined);

// Define guides for each page
const guides: PageGuide = {
  // Home page guide
  "/": [
    {
      target: ".start-playground-btn",
      title: "Start Playground",
      content: "Click here to start experimenting with machine learning algorithms.",
      position: "bottom"
    },
    {
      target: ".learn-more-btn",
      title: "Learn More",
      content: "Discover how PlayRithm works and what you can do with it.",
      position: "bottom"
    },
    {
      target: ".feature-cards",
      title: "Features",
      content: "Explore the key features of PlayRithm: Experiment, Visualize, and Learn.",
      position: "top"
    }
  ],
  
  // Dashboard guide
  "/dashboard": [
    {
      target: ".tabs-list",
      title: "Navigation Tabs",
      content: "Switch between your experiments and datasets.",
      position: "bottom"
    },
    {
      target: ".new-experiment-btn",
      title: "Create Experiment",
      content: "Start a new machine learning experiment.",
      position: "bottom"
    },
    {
      target: ".upload-dataset-btn",
      title: "Upload Dataset",
      content: "Add your own datasets to use in experiments.",
      position: "left"
    }
  ],
  
  // Algorithm pages guide (generic for all algorithm pages)
  "/algorithms": [
    {
      target: ".dataset-selector",
      title: "Select Dataset",
      content: "Choose from available datasets to train your model.",
      position: "right"
    },
    {
      target: ".parameters-panel",
      title: "Adjust Parameters",
      content: "Tune the algorithm parameters to see how they affect performance.",
      position: "left"
    },
    {
      target: ".visualization-panel",
      title: "Visualizations",
      content: "See the algorithm's performance and decision boundary.",
      position: "top"
    }
  ],
  
  // Specific guide for Linear Regression
  "/algorithms/linear-regression": [
    {
      target: ".dataset-selector",
      title: "Select Dataset",
      content: "Choose from sample or custom datasets to train your linear regression model.",
      position: "right"
    },
    {
      target: ".parameters-panel",
      title: "Linear Regression Parameters",
      content: "Adjust learning rate, epochs, and regularization to optimize your model.",
      position: "left"
    },
    {
      target: ".visualization-panel",
      title: "Performance Visualization",
      content: "Monitor your model's performance metrics and learning progress.",
      position: "top"
    }
  ],
  
  // Getting started guide
  "/getting-started": [
    {
      target: ".quick-start-guide",
      title: "Quick Start",
      content: "Follow these steps to begin using PlayRithm.",
      position: "right"
    },
    {
      target: ".interface-explanation",
      title: "Interface Guide",
      content: "Learn about the different components of the PlayRithm interface.",
      position: "bottom"
    }
  ]
};

// Check if the current path matches any of our guide paths
const getMatchingPath = (currentPath: string) => {
  // First check for exact matches
  if (guides[currentPath]) return currentPath;
  
  // Check for algorithm-specific pages
  if (currentPath.startsWith('/algorithms/')) {
    // Check if there's a specific guide for this algorithm
    if (guides[currentPath]) return currentPath;
    // Fall back to generic algorithms guide
    return '/algorithms';
  }
  
  return null;
};

export const UserGuideProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [activeStep, setActiveStep] = useState(-1); // -1 means guide is not active
  const [isFirstVisit, setIsFirstVisit] = useState<{[key: string]: boolean}>({});
  const location = useLocation();
  
  const currentPath = getMatchingPath(location.pathname);
  const currentPageGuide = currentPath ? guides[currentPath] : [];
  
  useEffect(() => {
    // Check if this is user's first visit to this page
    const checkFirstVisit = () => {
      const visitedPages = localStorage.getItem('visitedPages');
      const visited = visitedPages ? JSON.parse(visitedPages) : {};
      
      if (!currentPath) return false;
      
      if (!visited[currentPath]) {
        // Mark as visited
        visited[currentPath] = true;
        localStorage.setItem('visitedPages', JSON.stringify(visited));
        return true;
      }
      
      return false;
    };
    
    if (currentPath && checkFirstVisit()) {
      // Auto start guide on first visit
      setActiveStep(0);
    } else {
      // Reset guide when changing to a page without a guide
      setActiveStep(-1);
    }
  }, [location.pathname, currentPath]);
  
  const startGuide = () => {
    setActiveStep(0);
  };
  
  const nextStep = () => {
    if (activeStep < currentPageGuide.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // End of guide
      setActiveStep(-1);
    }
  };
  
  const skipGuide = () => {
    setActiveStep(-1);
  };
  
  const value = {
    activeStep,
    setActiveStep,
    isGuideActive: activeStep >= 0,
    startGuide,
    nextStep,
    skipGuide,
    currentPageGuide
  };
  
  return (
    <UserGuideContext.Provider value={value}>
      {children}
    </UserGuideContext.Provider>
  );
};

export const useUserGuide = (): UserGuideContextType => {
  const context = useContext(UserGuideContext);
  if (context === undefined) {
    throw new Error("useUserGuide must be used within a UserGuideProvider");
  }
  return context;
};
