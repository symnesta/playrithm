
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

const KNN = () => {
  const [neighbors, setNeighbors] = useState(5);
  const [weights, setWeights] = useState("uniform");
  const [metric, setMetric] = useState("euclidean");
  const [selectedDataset, setSelectedDataset] = useState("iris");
  
  const datasets = [
    { id: "iris", name: "Iris", description: "Iris flower classification", features: 4, samples: 150 },
    { id: "breast_cancer", name: "Breast Cancer", description: "Cancer diagnosis classification", features: 30, samples: 569 },
    { id: "digits", name: "Digits", description: "Handwritten digits", features: 64, samples: 1797 },
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
      
      <Button className="w-full">
        <PlayIcon className="mr-2 h-4 w-4" />
        Run Classification
      </Button>
    </div>
  );
  
  const VisualizationPanel = (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <p className="text-muted-foreground mb-4">
          Select a dataset and adjust parameters to visualize k-NN classification.
        </p>
        <div className="w-full h-64 bg-muted/30 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            Nearest neighbor visualization will appear here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AlgorithmPage
      title="k-Nearest Neighbors"
      description="Instance-based learning algorithm for classification and regression"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={VisualizationPanel}
    >
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
