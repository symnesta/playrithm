
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Share, BookOpen, Home, Save, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-card border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="text-primary font-bold text-2xl mr-2">
          <span className="text-white">Play</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-visualization-purple">Rithm</span>
        </div>
        
        <div className="hidden sm:flex px-2 py-1 bg-muted text-xs rounded-full">
          Beta
        </div>
      </div>
      
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {[
                  { name: "Linear Regression", description: "Predict continuous values based on linear relationships" },
                  { name: "Logistic Regression", description: "Binary classification model" },
                  { name: "Decision Tree", description: "Tree-based decision making model" },
                  { name: "k-NN", description: "k-Nearest Neighbors classification algorithm" },
                  { name: "SVM", description: "Support Vector Machine for classification tasks" },
                  { name: "Neural Network", description: "Multi-layer perceptron for complex patterns" }
                ].map((algo) => (
                  <li key={algo.name}>
                    <Link
                      to="/"
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
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Datasets</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {[
                  { name: "Iris", description: "Classic classification dataset with three species of iris flowers" },
                  { name: "Moons", description: "Synthetic dataset with two interleaving half circles" },
                  { name: "Blobs", description: "Isotropic Gaussian blobs for clustering" },
                  { name: "Titanic", description: "Survival prediction dataset from the Titanic disaster" }
                ].map((dataset) => (
                  <li key={dataset.name}>
                    <Link
                      to="/"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">{dataset.name}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {dataset.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              Docs
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2">
              About
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button variant="default" size="sm">
          <Home className="mr-2 h-4 w-4" />
          Start Playground
        </Button>
      </div>
    </header>
  );
};

export default Header;
