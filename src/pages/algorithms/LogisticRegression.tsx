
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

const LogisticRegression = () => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);
  const [regularization, setRegularization] = useState(0.1);
  const [penalty, setPenalty] = useState("l2");
  const [selectedDataset, setSelectedDataset] = useState("iris");
  
  const datasets = [
    { id: "iris", name: "Iris", description: "Iris flower classification", features: 4, samples: 150 },
    { id: "breast_cancer", name: "Breast Cancer", description: "Cancer diagnosis classification", features: 30, samples: 569 },
    { id: "moons", name: "Moons", description: "Synthetic two-class classification", features: 2, samples: 1000 },
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
          <Label htmlFor="learning-rate">Learning Rate</Label>
          <span className="text-sm text-muted-foreground">{learningRate}</span>
        </div>
        <Slider 
          id="learning-rate"
          min={0.001}
          max={1}
          step={0.001}
          value={[learningRate]}
          onValueChange={(value) => setLearningRate(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="epochs">Epochs</Label>
          <span className="text-sm text-muted-foreground">{epochs}</span>
        </div>
        <Slider 
          id="epochs"
          min={10}
          max={500}
          step={10}
          value={[epochs]}
          onValueChange={(value) => setEpochs(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="regularization">Regularization (λ)</Label>
          <span className="text-sm text-muted-foreground">{regularization}</span>
        </div>
        <Slider 
          id="regularization"
          min={0}
          max={2}
          step={0.1}
          value={[regularization]}
          onValueChange={(value) => setRegularization(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="penalty">Penalty Type</Label>
        <Select value={penalty} onValueChange={setPenalty}>
          <SelectTrigger id="penalty">
            <SelectValue placeholder="Select penalty type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="l1">L1 (Lasso)</SelectItem>
            <SelectItem value="l2">L2 (Ridge)</SelectItem>
            <SelectItem value="elasticnet">ElasticNet</SelectItem>
            <SelectItem value="none">None</SelectItem>
          </SelectContent>
        </Select>
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
          Select a dataset and adjust parameters to visualize logistic regression.
        </p>
        <div className="w-full h-64 bg-muted/30 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            Decision boundary visualization will appear here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AlgorithmPage
      title="Logistic Regression"
      description="Binary classification model used to predict probability of class membership"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={VisualizationPanel}
    >
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About Logistic Regression</h3>
        <p className="text-muted-foreground">
          Logistic regression is a statistical model that uses a logistic function to model a binary 
          dependent variable. Despite its name, it's used for classification rather than regression.
          It estimates the probability of an event occurring based on given independent variables.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Learning Rate</span>: Controls how much to adjust the model 
            weights with respect to the loss gradient. Higher values may converge faster but risk overshooting.
          </li>
          <li>
            <span className="font-medium">Epochs</span>: The number of complete passes through the 
            training dataset during gradient descent.
          </li>
          <li>
            <span className="font-medium">Regularization (λ)</span>: Controls the strength of regularization. 
            Higher values apply stronger regularization to prevent overfitting.
          </li>
          <li>
            <span className="font-medium">Penalty Type</span>: The type of regularization applied:
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>L1 (Lasso): Can zero out coefficients, useful for feature selection</li>
              <li>L2 (Ridge): Reduces coefficient magnitudes evenly, more common choice</li>
              <li>ElasticNet: Combination of L1 and L2</li>
              <li>None: No regularization applied</li>
            </ul>
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default LogisticRegression;
