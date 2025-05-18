
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
  },
  {
    id: "logistic-regression",
    name: "Logistic Regression",
    description: "Predict categorical values, commonly used for binary classification",
    path: "/algorithms/logistic-regression",
  },
  {
    id: "decision-tree",
    name: "Decision Tree",
    description: "Tree-based model for classification and regression tasks",
    path: "/algorithms/decision-tree",
  },
  {
    id: "k-nn",
    name: "k-Nearest Neighbors",
    description: "Instance-based learning for classification and regression",
    path: "/algorithms/k-nn",
  },
  {
    id: "svm",
    name: "Support Vector Machine",
    description: "Finds optimal decision boundaries for classification",
    path: "/algorithms/svm",
  },
  {
    id: "neural-network",
    name: "Neural Network",
    description: "Deep learning model inspired by the human brain",
    path: "/algorithms/neural-network",
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
            <Card key={algorithm.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle>{algorithm.name}</CardTitle>
                <CardDescription>{algorithm.description}</CardDescription>
              </CardHeader>
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
