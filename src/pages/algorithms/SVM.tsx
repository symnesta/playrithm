
import React, { useState } from "react";
import AlgorithmPage from "@/components/AlgorithmPage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SVM = () => {
  const [c, setC] = useState(1.0);
  const [kernel, setKernel] = useState("rbf");
  const [gamma, setGamma] = useState(0.1);
  const [selectedDataset, setSelectedDataset] = useState("moons");
  
  const datasets = [
    { id: "moons", name: "Moons", description: "Two interleaving half circles", features: 2, samples: 1000 },
    { id: "breast_cancer", name: "Breast Cancer", description: "Cancer diagnosis classification", features: 30, samples: 569 },
    { id: "iris", name: "Iris", description: "Iris flower classification", features: 4, samples: 150 },
  ];
  
  const DatasetSelector = (
    <div className="space-y-4">
      <RadioGroup value={selectedDataset} onValueChange={setSelectedDataset}>
        {datasets.map(dataset => (
          <div key={dataset.id} className="flex items-start space-x-2 border border-border rounded-md p-3">
            <RadioGroupItem value={dataset.id} id={dataset.id} />
            <div className="grid gap-1">
              <Label htmlFor={dataset.id} className="font-medium">
                {dataset.name}
              </Label>
              <div className="text-sm text-muted-foreground">
                <p>{dataset.description}</p>
                <p className="mt-1">{dataset.features} features, {dataset.samples} samples</p>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
  
  const ParametersPanel = (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="c">Regularization (C)</Label>
          <span className="text-sm text-muted-foreground">{c}</span>
        </div>
        <Slider 
          id="c"
          min={0.01}
          max={10}
          step={0.01}
          value={[c]}
          onValueChange={(value) => setC(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="kernel">Kernel</Label>
        <Select value={kernel} onValueChange={setKernel}>
          <SelectTrigger id="kernel">
            <SelectValue placeholder="Select kernel function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="linear">Linear</SelectItem>
            <SelectItem value="rbf">RBF (Radial Basis Function)</SelectItem>
            <SelectItem value="poly">Polynomial</SelectItem>
            <SelectItem value="sigmoid">Sigmoid</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="gamma">Kernel Coefficient (γ)</Label>
          <span className="text-sm text-muted-foreground">{gamma}</span>
        </div>
        <Slider 
          id="gamma"
          min={0.001}
          max={1}
          step={0.001}
          value={[gamma]}
          onValueChange={(value) => setGamma(value[0])} 
          disabled={kernel === "linear"}
        />
      </div>
      
      <Button className="w-full">
        <PlayIcon className="mr-2 h-4 w-4" />
        Train Model
      </Button>
    </div>
  );
  
  const VisualizationPanel = (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Select a dataset and adjust parameters to visualize SVM decision boundaries.
        </p>
        <div className="w-full h-64 bg-muted/30 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            SVM decision boundary visualization will appear here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AlgorithmPage
      title="Support Vector Machine"
      description="Powerful classification algorithm that finds optimal decision boundaries"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={VisualizationPanel}
    >
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About Support Vector Machines</h3>
        <p className="text-muted-foreground">
          Support Vector Machines (SVMs) are supervised learning models used for classification and regression.
          They find the hyperplane that best separates classes with the maximum margin, which helps improve
          generalization and robustness to new data.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Regularization (C)</span>: Controls the trade-off between achieving 
            a smooth decision boundary and classifying training points correctly. A lower C value creates a 
            smoother decision boundary with potentially more misclassifications.
          </li>
          <li>
            <span className="font-medium">Kernel</span>: Mathematical function used to transform data into a higher 
            dimensional space where it becomes easier to separate:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Linear: Creates a linear decision boundary</li>
              <li>RBF: Creates a flexible, non-linear boundary (most common choice)</li>
              <li>Polynomial: Uses polynomial functions for non-linear boundaries</li>
              <li>Sigmoid: Shape resembles a logistic function</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Kernel Coefficient (γ)</span>: For non-linear kernels, defines how much 
            influence a single training example has. Higher values mean closer examples have more influence.
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default SVM;
