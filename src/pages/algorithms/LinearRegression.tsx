
import React, { useState } from "react";
import AlgorithmPage from "@/components/AlgorithmPage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "lucide-react";

const LinearRegression = () => {
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);
  const [regularization, setRegularization] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState("boston");
  
  const datasets = [
    { id: "boston", name: "Boston Housing", description: "Predict house prices in Boston", features: 13, samples: 506 },
    { id: "california", name: "California Housing", description: "House prices in California districts", features: 8, samples: 20640 },
    { id: "diabetes", name: "Diabetes", description: "Progression of diabetes", features: 10, samples: 442 },
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
          max={1}
          step={0.01}
          value={[regularization]}
          onValueChange={(value) => setRegularization(value[0])} 
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
          Select a dataset and adjust parameters to visualize model training.
        </p>
        <div className="w-full h-64 bg-muted/30 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            Visualization will appear here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AlgorithmPage
      title="Linear Regression"
      description="Predict continuous values based on linear relationships between variables"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={VisualizationPanel}
    >
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About Linear Regression</h3>
        <p className="text-muted-foreground">
          Linear regression is a statistical method that models the relationship between a dependent 
          variable and one or more independent variables. It's used to predict continuous values 
          such as house prices, temperatures, or stock prices.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Learning Rate</span>: Controls how much the model parameters 
            change with each iteration. Higher values may converge faster but risk overshooting.
          </li>
          <li>
            <span className="font-medium">Epochs</span>: The number of complete passes through the 
            training dataset during gradient descent.
          </li>
          <li>
            <span className="font-medium">Regularization (λ)</span>: Helps prevent overfitting by 
            penalizing large coefficient values. Higher values apply stronger regularization.
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default LinearRegression;
