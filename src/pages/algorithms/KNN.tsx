
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

const KNN = () => {
  const { isLoggedIn } = useAuth();
  const [neighbors, setNeighbors] = useState(5);
  const [weights, setWeights] = useState("uniform");
  const [metric, setMetric] = useState("euclidean");
  const [selectedDataset, setSelectedDataset] = useState("iris");
  const [datasetType, setDatasetType] = useState("sample");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState([
    { epoch: 1, loss: 0.4, accuracy: 0.72 },
    { epoch: 2, loss: 0.35, accuracy: 0.78 },
    { epoch: 3, loss: 0.32, accuracy: 0.82 },
  ]);
  const [showStepGuide, setShowStepGuide] = useState(true);
  
  const sampleDatasets = [
    { id: "iris", name: "Iris", description: "Iris flower classification", features: 4, samples: 150 },
    { id: "breast_cancer", name: "Breast Cancer", description: "Cancer diagnosis classification", features: 30, samples: 569 },
  ];
  
  // Custom datasets (only visible when logged in)
  const customDatasets = isLoggedIn ? [
    { id: "customer_segments", name: "Customer Segments", description: "Custom customer segmentation data", features: 8, samples: 500 },
  ] : [];

  // Get the active datasets based on selected type
  const activeDatasets = datasetType === 'custom' ? customDatasets : sampleDatasets;

  const handleRunClassification = () => {
    setIsTraining(true);
    setShowStepGuide(false);
    
    // Simulate classification process with more detailed metrics
    const newMetrics = [];
    for (let i = 1; i <= 5; i++) {
      newMetrics.push({
        epoch: i,
        loss: 0.4 * Math.exp(-0.12 * i) + 0.1,
        accuracy: 0.7 + 0.05 * i * (1 - 0.7),
        valLoss: 0.45 * Math.exp(-0.1 * i) + 0.12,
        valAccuracy: 0.68 + 0.045 * i * (1 - 0.68),
      });
    }
    setTrainingMetrics(newMetrics);
    
    // Simulate end of training
    setTimeout(() => {
      setIsTraining(false);
    }, 1500);
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
          <Label htmlFor="neighbors">Number of Neighbors (k)</Label>
          <span className="text-sm text-muted-foreground">{neighbors}</span>
        </div>
        <Slider 
          id="neighbors"
          min={1}
          max={20}
          step={1}
          value={[neighbors]}
          onValueChange={(value) => setNeighbors(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="weights">Weight Function</Label>
        <Select value={weights} onValueChange={setWeights}>
          <SelectTrigger id="weights">
            <SelectValue placeholder="Select weight function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="uniform">Uniform</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="metric">Distance Metric</Label>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger id="metric">
            <SelectValue placeholder="Select distance metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="euclidean">Euclidean</SelectItem>
            <SelectItem value="manhattan">Manhattan</SelectItem>
            <SelectItem value="minkowski">Minkowski</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Button className="w-full" onClick={handleRunClassification} disabled={isTraining}>
        <PlayIcon className="mr-2 h-4 w-4" />
        {isTraining ? "Running..." : "Run Classification"}
      </Button>
    </div>
  );

  // Step-by-step guide for KNN
  const StepGuide = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3">Step-by-Step Guide: k-Nearest Neighbors</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Select a dataset from the available options on the left panel.</li>
          <li>Choose the number of neighbors (k) - this defines how many nearest points will be used for classification.</li>
          <li>Select a weight function - determines how neighbors are weighted in the voting process.</li>
          <li>Choose a distance metric - defines how distances between points are calculated.</li>
          <li>Click "Run Classification" to execute the algorithm on the selected dataset.</li>
          <li>Observe the decision boundary visualization and performance metrics.</li>
          <li>Experiment with different parameter values to see how they affect the model's performance.</li>
        </ol>
        <Alert className="mt-4 bg-blue-500/10">
          <AlertDescription className="text-sm">
            <div className="flex gap-2">
              <Info className="h-4 w-4" />
              <span>Tip: Start with a moderate k value (5-7) and adjust based on performance.</span>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  return (
    <AlgorithmPage
      title="k-Nearest Neighbors"
      description="Instance-based learning algorithm for classification and regression"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={
        <VisualizationPanel
          trainingMetrics={trainingMetrics}
          modelType="k-nn"
          isTraining={isTraining}
        />
      }
    >
      {showStepGuide && <StepGuide />}
      
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About k-Nearest Neighbors</h3>
        <p className="text-muted-foreground">
          k-Nearest Neighbors (k-NN) is a simple, non-parametric algorithm used for classification and regression.
          It classifies a data point based on how its neighbors are classified, with classification determined 
          by a majority vote of its k nearest neighbors.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Number of Neighbors (k)</span>: The number of nearest neighbors to use 
            for classification. Small values make the model sensitive to noise, while large values reduce the impact 
            of outliers but blur class distinctions.
          </li>
          <li>
            <span className="font-medium">Weight Function</span>: How to weight the contribution of neighbors:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Uniform: All points in the neighborhood are weighted equally</li>
              <li>Distance: Points closer to the query point have greater influence</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Distance Metric</span>: How to calculate distance between points:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Euclidean: Straight-line distance between points</li>
              <li>Manhattan: Sum of absolute differences of coordinates</li>
              <li>Minkowski: Generalization of Euclidean and Manhattan distances</li>
            </ul>
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default KNN;
