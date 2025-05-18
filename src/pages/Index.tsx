
import React, { useState } from "react";
import Header from "@/components/Header";
import ParameterControls from "@/components/ParameterControls";
import VisualizationPanel from "@/components/VisualizationPanel";
import ModelPlayground from "@/components/ModelPlayground";
import DatasetSelector from "@/components/DatasetSelector";
import AlgorithmComparison from "@/components/AlgorithmComparison";
import { generateAlgorithmComparison } from "@/utils/mlUtils";

const Index = () => {
  // Model parameters state
  const [parameters, setParameters] = useState({
    learningRate: 0.01,
    epochs: 20,
    batchSize: 32,
    optimizer: "adam",
    hiddenLayers: 3,
    neuronsPerLayer: 64,
    regularization: 0.001,
    activationFunction: "relu"
  });

  // Dataset state
  const [selectedDataset, setSelectedDataset] = useState("mnist");
  
  // Training state
  const [isTraining, setIsTraining] = useState(false);
  const [trainingMetrics, setTrainingMetrics] = useState([
    { epoch: 0, loss: 1.0, accuracy: 0.5 }
  ]);

  // Comparison data
  const [comparisonData] = useState(generateAlgorithmComparison());

  // Handle parameter changes
  const handleParameterChange = (parameter: string, value: number | string) => {
    setParameters(prev => ({
      ...prev,
      [parameter]: value
    }));
  };

  // Handle dataset selection
  const handleDatasetSelect = (dataset: any) => {
    setSelectedDataset(dataset.id);
    // In a real app, we would load the dataset here
  };

  // Handle training progress updates
  const handleTrainingProgress = (metrics: any) => {
    setTrainingMetrics(prev => [...prev, metrics]);
  };

  // Handle training completion
  const handleTrainingComplete = () => {
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Interactive ML Playground</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left column - Dataset and Parameters */}
            <div className="space-y-6">
              <DatasetSelector 
                onSelectDataset={handleDatasetSelect}
                selectedDataset={selectedDataset}
              />
              
              <ParameterControls 
                parameters={parameters}
                onParameterChange={handleParameterChange}
                isTraining={isTraining}
              />
            </div>
            
            {/* Center column - Model Playground */}
            <div className="space-y-6">
              <ModelPlayground 
                parameters={parameters}
                datasetId={selectedDataset}
                onTrainingProgress={handleTrainingProgress}
                onTrainingComplete={handleTrainingComplete}
              />
              
              <AlgorithmComparison results={comparisonData} />
            </div>
            
            {/* Right column - Visualizations */}
            <div>
              <VisualizationPanel 
                trainingMetrics={trainingMetrics}
                modelType={parameters.optimizer}
                isTraining={isTraining}
              />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>
    </div>
  );
};

export default Index;
