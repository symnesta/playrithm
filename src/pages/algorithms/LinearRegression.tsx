
import React, { useState } from "react";
import AlgorithmPage from "@/components/AlgorithmPage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { PlayIcon, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import VisualizationPanel from "@/components/VisualizationPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LinearRegression = () => {
  const { isLoggedIn } = useAuth();
  const [learningRate, setLearningRate] = useState(0.01);
  const [epochs, setEpochs] = useState(100);
  const [regularization, setRegularization] = useState(0);
  const [selectedDataset, setSelectedDataset] = useState("boston");
  const [datasetType, setDatasetType] = useState("sample");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState([]);
  const [showStepGuide, setShowStepGuide] = useState(true);
  
  // Sample datasets for Linear Regression
  const sampleDatasets = [
    { id: "boston", name: "Boston Housing", description: "Predict house prices in Boston", features: 13, samples: 506 },
    { id: "california", name: "California Housing", description: "House prices in California districts", features: 8, samples: 20640 },
  ];
  
  // Custom datasets (only visible when logged in)
  const customDatasets = isLoggedIn ? [
    { id: "housing_prices", name: "Housing Prices", description: "Custom housing dataset", features: 79, samples: 1460 },
  ] : [];

  // Get the active datasets based on selected type
  const activeDatasets = datasetType === 'custom' ? customDatasets : sampleDatasets;

  const handleTrainModel = () => {
    setIsTraining(true);
    setShowStepGuide(false);
    
    // Simulate training process
    const newMetrics = [];
    for (let i = 1; i <= 20; i++) {
      newMetrics.push({
        epoch: i,
        loss: 0.5 * Math.exp(-0.1 * i) + 0.05,
        accuracy: 0.6 + 0.02 * i * (1 - 0.6),
        valLoss: 0.55 * Math.exp(-0.08 * i) + 0.07,
        valAccuracy: 0.58 + 0.018 * i * (1 - 0.58),
      });
    }
    setTrainingMetrics(newMetrics);
    
    // Simulate end of training
    setTimeout(() => {
      setIsTraining(false);
    }, 3000);
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
          <Label htmlFor="learning-rate">Learning Rate</Label>
          <span className="text-sm text-muted-foreground">{learningRate}</span>
        </div>
        <Slider 
          id="learning-rate"
          min={0.001}
          max={0.1}
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
          max={200}
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
          max={0.1}
          step={0.001}
          value={[regularization]}
          onValueChange={(value) => setRegularization(value[0])} 
        />
      </div>
      
      <Button className="w-full" onClick={handleTrainModel} disabled={isTraining}>
        <PlayIcon className="mr-2 h-4 w-4" />
        {isTraining ? "Training..." : "Train Model"}
      </Button>
    </div>
  );
  
  // Step-by-step guide for Linear Regression
  const StepGuide = () => (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-3">Step-by-Step Guide: Linear Regression</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
          <li>Select a dataset from the available options on the left panel.</li>
          <li>Adjust the learning rate - lower values (0.001-0.01) are more stable but slower, higher values may converge faster.</li>
          <li>Set the number of epochs - more epochs allow for better model convergence but increase training time.</li>
          <li>Choose regularization strength (λ) - higher values prevent overfitting by penalizing large coefficients.</li>
          <li>Click "Train Model" to start the training process on the selected dataset.</li>
          <li>Observe the training metrics and performance visualization.</li>
          <li>Experiment with different parameter combinations to optimize model performance.</li>
        </ol>
        <Alert className="mt-4 bg-blue-500/10">
          <AlertDescription className="text-sm">
            <div className="flex gap-2">
              <Info className="h-4 w-4" />
              <span>Tip: For this example, start with a learning rate of 0.01, 100 epochs, and no regularization.</span>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );

  return (
    <AlgorithmPage
      title="Linear Regression"
      description="Predict continuous values based on linear relationships between variables"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={
        <VisualizationPanel
          trainingMetrics={trainingMetrics}
          modelType="linear-regression"
          isTraining={isTraining}
        />
      }
    >
      {showStepGuide && <StepGuide />}
      
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
            Recommended range: 0.001 to 0.1
          </li>
          <li>
            <span className="font-medium">Epochs</span>: The number of complete passes through the 
            training dataset during gradient descent. More epochs allow for better convergence but 
            increase training time.
            Recommended range: 50 to 200 for most datasets
          </li>
          <li>
            <span className="font-medium">Regularization (λ)</span>: Helps prevent overfitting by 
            penalizing large coefficient values. Higher values apply stronger regularization.
            Recommended range: 0 (no regularization) to 0.1
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default LinearRegression;
