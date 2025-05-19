
import React, { useState } from "react";
import AlgorithmPage from "@/components/AlgorithmPage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PlayIcon, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VisualizationPanel from "@/components/VisualizationPanel";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SVM = () => {
  const { isLoggedIn } = useAuth();
  const [c, setC] = useState(1.0);
  const [kernel, setKernel] = useState("rbf");
  const [gamma, setGamma] = useState(0.1);
  const [selectedDataset, setSelectedDataset] = useState("moons");
  const [datasetType, setDatasetType] = useState("sample");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState([]);
  const [showStepGuide, setShowStepGuide] = useState(true);
  
  const sampleDatasets = [
    { id: "moons", name: "Moons", description: "Two interleaving half circles", features: 2, samples: 1000 },
    { id: "breast_cancer", name: "Breast Cancer", description: "Cancer diagnosis classification", features: 30, samples: 569 },
  ];
  
  // Custom datasets (only visible when logged in)
  const customDatasets = isLoggedIn ? [
    { id: "custom_binary", name: "Binary Classification", description: "Custom binary classification dataset", features: 10, samples: 800 },
  ] : [];

  // Get the active datasets based on selected type
  const activeDatasets = datasetType === 'custom' ? customDatasets : sampleDatasets;

  const handleTrainModel = () => {
    setIsTraining(true);
    setShowStepGuide(false);
    
    // Generate more detailed training metrics
    const newMetrics = [];
    for (let i = 1; i <= 15; i++) {
      newMetrics.push({
        epoch: i,
        loss: 0.42 * Math.exp(-0.13 * i) + 0.08,
        accuracy: 0.73 + 0.018 * i * (1 - 0.73),
        valLoss: 0.45 * Math.exp(-0.11 * i) + 0.09,
        valAccuracy: 0.71 + 0.016 * i * (1 - 0.71),
      });
    }
    setTrainingMetrics(newMetrics);
    
    // Simulate end of training
    setTimeout(() => {
      setIsTraining(false);
    }, 2000);
  };
  
  const DatasetSelector = (
    <div className="space-y-4">
      {isLoggedIn && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Dataset Type</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant={datasetType === "sample" ? "secondary" : "outline"}
              className={`p-2 text-center text-sm font-medium ${datasetType === "sample" ? "bg-secondary/30" : ""}`}
              onClick={() => setDatasetType("sample")}
            >
              Sample
            </Button>
            <Button
              variant={datasetType === "custom" ? "secondary" : "outline"} 
              className={`p-2 text-center text-sm font-medium ${datasetType === "custom" ? "bg-primary/20" : ""}`}
              onClick={() => setDatasetType("custom")}
            >
              Custom
            </Button>
          </div>
        </div>
      )}
      
      <RadioGroup value={selectedDataset} onValueChange={setSelectedDataset}>
        {/* Sample/Custom Datasets Section based on selected type */}
        {(isLoggedIn || datasetType === "sample") && activeDatasets.length > 0 && (
          <>
            <h4 className="text-sm font-medium mb-2">
              {isLoggedIn && datasetType === "custom" ? "Your Datasets" : "Sample Datasets"}
            </h4>
            {activeDatasets.map(dataset => (
              <div 
                key={dataset.id} 
                className={`flex items-start space-x-2 border border-border rounded-md p-3 ${
                  datasetType === "custom" ? "bg-primary/5" : "bg-secondary/10"
                }`}
              >
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
          </>
        )}
        
        {/* Message for logged out users */}
        {!isLoggedIn && (
          <div className="mt-4 p-3 border border-dashed border-border rounded-md text-center">
            <p className="text-sm text-muted-foreground">Log in to use your own datasets</p>
          </div>
        )}
        
        {/* Empty state for custom datasets */}
        {isLoggedIn && datasetType === "custom" && customDatasets.length === 0 && (
          <div className="mt-4 p-3 border border-dashed border-border rounded-md text-center">
            <p className="text-sm text-muted-foreground">No custom datasets available</p>
          </div>
        )}
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
      
      <Button className="w-full" onClick={handleTrainModel} disabled={isTraining}>
        <PlayIcon className="mr-2 h-4 w-4" />
        {isTraining ? "Training..." : "Train Model"}
      </Button>
    </div>
  );
  
  // Step-by-step guide for SVM
  const StepGuide = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3">Step-by-Step Guide: Support Vector Machine</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Select a dataset from the available options on the left panel.</li>
          <li>Choose the regularization parameter (C) - controls the trade-off between achieving a smooth decision boundary and classifying training points correctly.</li>
          <li>Select a kernel function - determines how the data is transformed into a higher-dimensional space:</li>
          <ul className="list-disc pl-5 mt-1 mb-1 space-y-1">
            <li>Linear - for linearly separable data</li>
            <li>RBF - for non-linear, complex decision boundaries (most common)</li>
            <li>Polynomial - for curved decision boundaries</li>
            <li>Sigmoid - creates boundaries resembling neural networks</li>
          </ul>
          <li>Adjust the kernel coefficient (γ) - defines how far the influence of a single training example reaches.</li>
          <li>Click "Train Model" to start the training process.</li>
          <li>Observe the decision boundary and performance metrics.</li>
          <li>Experiment with different parameter combinations to optimize performance.</li>
        </ol>
        <Alert className="mt-4 bg-blue-500/10">
          <AlertDescription className="text-sm">
            <div className="flex gap-2">
              <Info className="h-4 w-4" />
              <span>Tip: For most cases, start with RBF kernel, C=1.0, and gamma=0.1, then adjust based on performance.</span>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  return (
    <AlgorithmPage
      title="Support Vector Machine"
      description="Powerful classification algorithm that finds optimal decision boundaries"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={
        <VisualizationPanel
          trainingMetrics={trainingMetrics}
          modelType="svm"
          isTraining={isTraining}
        />
      }
    >
      {showStepGuide && <StepGuide />}
      
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
