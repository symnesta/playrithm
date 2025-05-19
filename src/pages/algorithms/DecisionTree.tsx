
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
import VisualizationPanel from "@/components/VisualizationPanel";
import { useAuth } from "@/contexts/AuthContext";

const DecisionTree = () => {
  const { isLoggedIn } = useAuth();
  const [maxDepth, setMaxDepth] = useState(3);
  const [minSamplesSplit, setMinSamplesSplit] = useState(2);
  const [criterion, setCriterion] = useState("gini");
  const [selectedDataset, setSelectedDataset] = useState("titanic");
  const [datasetType, setDatasetType] = useState("sample");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState([
    { epoch: 1, loss: 0.5, accuracy: 0.6 },
    { epoch: 2, loss: 0.45, accuracy: 0.65 },
    { epoch: 3, loss: 0.4, accuracy: 0.7 },
  ]);
  
  const datasets = [
    { id: "titanic", name: "Titanic", description: "Survival prediction dataset", features: 10, samples: 891 },
    { id: "iris", name: "Iris", description: "Iris flower classification", features: 4, samples: 150 },
  ];
  
  // Custom datasets (only visible when logged in)
  const customDatasets = isLoggedIn ? [
    { id: "credit_risk", name: "Credit Risk", description: "Custom credit risk dataset", features: 23, samples: 1000 },
  ] : [];

  const handleTrainModel = () => {
    setIsTraining(true);
    // Simulate training process
    const newMetrics = [];
    for (let i = 1; i <= 10; i++) {
      newMetrics.push({
        epoch: i,
        loss: 0.5 * Math.exp(-0.15 * i) + 0.08,
        accuracy: 0.55 + 0.035 * i * (1 - 0.55),
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
        {/* Sample Datasets Section */}
        {(datasetType === "sample" || !isLoggedIn) && datasets.length > 0 && (
          <>
            <h4 className="text-sm font-medium mb-2">Sample Datasets</h4>
            {datasets.map(dataset => (
              <div key={dataset.id} className="flex items-start space-x-2 border border-border rounded-md p-3 bg-secondary/10">
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
        
        {/* Custom Datasets Section - Only visible when logged in */}
        {isLoggedIn && datasetType === "custom" && customDatasets.length > 0 && (
          <>
            <h4 className="text-sm font-medium mt-4 mb-2">Your Datasets</h4>
            {customDatasets.map(dataset => (
              <div key={dataset.id} className="flex items-start space-x-2 border border-border rounded-md p-3 bg-primary/5">
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
      </RadioGroup>
    </div>
  );
  
  const ParametersPanel = (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="max-depth">Max Depth</Label>
          <span className="text-sm text-muted-foreground">{maxDepth}</span>
        </div>
        <Slider 
          id="max-depth"
          min={1}
          max={20}
          step={1}
          value={[maxDepth]}
          onValueChange={(value) => setMaxDepth(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="min-samples-split">Min Samples Split</Label>
          <span className="text-sm text-muted-foreground">{minSamplesSplit}</span>
        </div>
        <Slider 
          id="min-samples-split"
          min={2}
          max={20}
          step={1}
          value={[minSamplesSplit]}
          onValueChange={(value) => setMinSamplesSplit(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="criterion">Split Criterion</Label>
        <Select value={criterion} onValueChange={setCriterion}>
          <SelectTrigger id="criterion">
            <SelectValue placeholder="Select criterion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gini">Gini Impurity</SelectItem>
            <SelectItem value="entropy">Entropy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full" onClick={handleTrainModel} disabled={isTraining}>
        <PlayIcon className="mr-2 h-4 w-4" />
        {isTraining ? "Training..." : "Train Model"}
      </Button>
    </div>
  );

  return (
    <AlgorithmPage
      title="Decision Tree"
      description="Tree-based model for classification and regression tasks"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={
        <VisualizationPanel
          trainingMetrics={trainingMetrics}
          modelType="decision-tree"
          isTraining={isTraining}
        />
      }
    >
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About Decision Trees</h3>
        <p className="text-muted-foreground">
          Decision trees are a non-parametric supervised learning method used for classification and regression.
          The model creates a flowchart-like tree structure where each internal node represents a feature,
          each branch represents a decision rule, and each leaf node represents an outcome.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Max Depth</span>: The maximum depth of the tree. Deeper trees 
            can model more complex patterns but may overfit the data.
          </li>
          <li>
            <span className="font-medium">Min Samples Split</span>: The minimum number of samples required 
            to split an internal node. Higher values prevent creating nodes that might lead to overfitting.
          </li>
          <li>
            <span className="font-medium">Split Criterion</span>: The function used to measure the quality of a split:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Gini Impurity: Measures the probability of incorrect classification</li>
              <li>Entropy: Based on information gain and measures the disorder in the data</li>
            </ul>
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default DecisionTree;
