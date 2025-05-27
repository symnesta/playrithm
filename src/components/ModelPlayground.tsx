
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { simulateTraining } from "@/utils/mlUtils";

interface ModelPlaygroundProps {
  parameters: {
    learningRate: number;
    epochs: number;
    batchSize: number;
    optimizer: string;
    hiddenLayers: number;
    neuronsPerLayer: number;
    regularization: number;
    activationFunction: string;
  };
  datasetId: string;
  onTrainingProgress: (metrics: any) => void;
  onTrainingComplete: () => void;
}

const ModelPlayground: React.FC<ModelPlaygroundProps> = ({
  parameters,
  datasetId,
  onTrainingProgress,
  onTrainingComplete
}) => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [trainTestSplit, setTrainTestSplit] = useState(0.8); // 80% training, 20% testing
  const [datasetStats, setDatasetStats] = useState({
    totalSamples: 1000,
    trainingSamples: 800,
    testingSamples: 200
  });

  // Update dataset statistics when split ratio changes
  useEffect(() => {
    const getDatasetSize = (id: string) => {
      const sizes: Record<string, number> = {
        'mnist': 70000,
        'iris': 150,
        'boston': 506,
        'cifar': 60000,
        'titanic': 891,
        'credit_risk': 1000
      };
      return sizes[id] || 1000;
    };

    const totalSamples = getDatasetSize(datasetId);
    const trainingSamples = Math.floor(totalSamples * trainTestSplit);
    const testingSamples = totalSamples - trainingSamples;

    setDatasetStats({
      totalSamples,
      trainingSamples,
      testingSamples
    });
  }, [datasetId, trainTestSplit]);
  
  const startTraining = () => {
    setIsTraining(true);
    setProgress(0);
    setCurrentEpoch(0);
  };

  const stopTraining = () => {
    setIsTraining(false);
  };

  useEffect(() => {
    if (!isTraining) return;

    let interval: ReturnType<typeof setInterval>;
    let epochCounter = 0;

    // Simulate training loop
    interval = setInterval(() => {
      if (epochCounter >= parameters.epochs) {
        setIsTraining(false);
        onTrainingComplete();
        clearInterval(interval);
        return;
      }

      epochCounter += 1;
      setCurrentEpoch(epochCounter);
      
      // Calculate progress percentage
      const newProgress = (epochCounter / parameters.epochs) * 100;
      setProgress(newProgress);

      // Generate mock metrics for this epoch with both training and validation
      const metrics = simulateTraining(
        epochCounter, 
        parameters.epochs, 
        parameters.learningRate, 
        datasetId
      );
      
      // Add validation metrics (typically slightly worse than training)
      const enhancedMetrics = {
        ...metrics,
        valLoss: metrics.loss + Math.random() * 0.1 + 0.05,
        valAccuracy: Math.max(0.3, metrics.accuracy - Math.random() * 0.1 - 0.02)
      };
      
      // Update visualization
      onTrainingProgress(enhancedMetrics);
      
    }, 300); // Adjust speed of simulation

    return () => clearInterval(interval);
  }, [isTraining, parameters, datasetId, onTrainingProgress, onTrainingComplete]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Model Playground</CardTitle>
        <CardDescription>
          Train and evaluate your model with train/test data split
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dataset Split Configuration */}
        <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
          <div className="flex justify-between items-center">
            <Label htmlFor="train-test-split" className="font-medium">
              Train/Test Split Ratio
            </Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(trainTestSplit * 100)}% / {Math.round((1 - trainTestSplit) * 100)}%
            </span>
          </div>
          <Slider
            id="train-test-split"
            min={0.5}
            max={0.9}
            step={0.05}
            value={[trainTestSplit]}
            onValueChange={(value) => setTrainTestSplit(value[0])}
            className="w-full"
          />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-2 bg-background rounded border">
              <div className="text-lg font-semibold text-primary">{datasetStats.totalSamples.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Samples</div>
            </div>
            <div className="p-2 bg-visualization-blue/10 rounded border border-visualization-blue/20">
              <div className="text-lg font-semibold text-visualization-blue">{datasetStats.trainingSamples.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Training Set</div>
            </div>
            <div className="p-2 bg-visualization-green/10 rounded border border-visualization-green/20">
              <div className="text-lg font-semibold text-visualization-green">{datasetStats.testingSamples.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Test Set</div>
            </div>
          </div>
        </div>

        {/* Model Parameters Display */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-border bg-card/30">
            <div className="text-2xl font-bold text-primary">
              {parameters.optimizer.toUpperCase()}
            </div>
            <div className="text-xs text-muted-foreground">Optimizer</div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-border bg-card/30">
            <div className="text-2xl font-bold text-visualization-green">
              {parameters.hiddenLayers}
            </div>
            <div className="text-xs text-muted-foreground">Hidden Layers</div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-border bg-card/30">
            <div className="text-2xl font-bold text-visualization-blue">
              {parameters.activationFunction}
            </div>
            <div className="text-xs text-muted-foreground">Activation</div>
          </div>
        </div>
        
        {/* Network Visualization */}
        <div className="relative pt-6">
          <div className="visualization-container h-40 flex items-center justify-center">
            <div className="flex h-full items-center justify-between w-full px-8">
              {/* Input layer */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-3 h-3 rounded-full bg-visualization-blue"></div>
                <div className="w-3 h-3 rounded-full bg-visualization-blue"></div>
                <div className="w-3 h-3 rounded-full bg-visualization-blue"></div>
                <div className="text-xs text-muted-foreground mt-2">Input</div>
              </div>

              {/* Hidden layers */}
              {Array.from({ length: Math.min(parameters.hiddenLayers, 4) }).map((_, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="w-3 h-3 rounded-full bg-visualization-purple"></div>
                  <div className="w-3 h-3 rounded-full bg-visualization-purple"></div>
                  <div className="w-3 h-3 rounded-full bg-visualization-purple"></div>
                  {i === Math.min(parameters.hiddenLayers, 4) - 1 && parameters.hiddenLayers > 4 && (
                    <div className="text-xs text-muted-foreground">+{parameters.hiddenLayers - 4} more</div>
                  )}
                </div>
              ))}

              {/* Output layer */}
              <div className="flex flex-col items-center space-y-2">
                <div className="w-3 h-3 rounded-full bg-visualization-green"></div>
                <div className="w-3 h-3 rounded-full bg-visualization-green"></div>
                <div className="text-xs text-muted-foreground mt-2">Output</div>
              </div>
            </div>

            {/* Data flow animation during training */}
            {isTraining && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute h-2 w-2 bg-primary rounded-full top-1/2 left-1/4 transform -translate-y-1/2 animate-data-flow"></div>
                <div className="absolute h-2 w-2 bg-primary rounded-full top-1/3 left-1/2 transform -translate-y-1/2 animate-data-flow" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute h-2 w-2 bg-primary rounded-full top-2/3 left-1/3 transform -translate-y-1/2 animate-data-flow" style={{ animationDelay: '1s' }}></div>
              </div>
            )}
          </div>
        </div>

        {/* Training Progress */}
        {isTraining && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div>Training Progress</div>
              <div>Epoch {currentEpoch}/{parameters.epochs}</div>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Training on {datasetStats.trainingSamples.toLocaleString()} samples, 
              validating on {datasetStats.testingSamples.toLocaleString()} samples
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="secondary"
            onClick={() => {
              /* Reset model weights */
            }}
            disabled={isTraining}
          >
            Reset
          </Button>
          
          <div className="space-x-2">
            {isTraining ? (
              <Button 
                variant="destructive" 
                onClick={stopTraining}
              >
                Stop Training
              </Button>
            ) : (
              <Button 
                onClick={startTraining}
              >
                Start Training
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPlayground;
