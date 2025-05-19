
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SelectAlgorithmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const algorithms = [
  {
    id: "linear-regression",
    name: "Linear Regression",
    description: "Predict continuous values based on linear relationships between variables",
    path: "/algorithms/linear-regression",
    category: "Regression",
    complexity: "Low",
    useCases: "Price prediction, trend forecasting"
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    description: "Predict categorical values, commonly used for binary classification",
    path: "/algorithms/logistic-regression",
    category: "Classification",
    complexity: "Low",
    useCases: "Spam detection, medical diagnosis"
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    description: "Tree-based model for classification and regression tasks",
    path: "/algorithms/decision-tree",
    category: "Classification/Regression",
    complexity: "Medium",
    useCases: "Customer segmentation, medical diagnosis"
  },
  {
    id: "k-nn",
    name: "k-Nearest Neighbors",
    description: "Instance-based learning for classification and regression",
    path: "/algorithms/k-nn",
    category: "Classification/Regression",
    complexity: "Low",
    useCases: "Recommendation systems, anomaly detection"
  },
  {
    id: "svm",
    name: "Support Vector Machine",
    description: "Finds optimal decision boundaries for classification",
    path: "/algorithms/svm",
    category: "Classification",
    complexity: "Medium",
    useCases: "Image classification, text categorization"
  },
  {
    id: "neural-network",
    name: "Neural Network",
    description: "Deep learning model inspired by the human brain",
    path: "/algorithms/neural-network",
    category: "Classification/Regression",
    complexity: "High",
    useCases: "Image recognition, natural language processing"
  },
];

const SelectAlgorithmDialog: React.FC<SelectAlgorithmDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const navigate = useNavigate();

  const handleSelectAlgorithm = (path: string) => {
    navigate(path);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Algorithm</DialogTitle>
          <DialogDescription>
            Choose an algorithm to start a new experiment
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {algorithms.map((algorithm) => (
            <Card key={algorithm.id} className="overflow-hidden hover:shadow-md transition-shadow border-border">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>{algorithm.name}</CardTitle>
                  <span className="text-xs bg-secondary rounded-full px-2 py-1">
                    {algorithm.category}
                  </span>
                </div>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Complexity: {algorithm.complexity}</span>
                  <span>Use Cases: {algorithm.useCases}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  onClick={() => handleSelectAlgorithm(algorithm.path)}
                  className="w-full"
                >
                  Select
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SelectAlgorithmDialog;
