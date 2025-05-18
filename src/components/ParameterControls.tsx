
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ParameterControlsProps {
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
  onParameterChange: (parameter: string, value: number | string) => void;
  isTraining: boolean;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  parameters,
  onParameterChange,
  isTraining
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>
              Adjust model hyperparameters
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="auto-train" className="text-sm">Auto Train</Label>
            <Switch id="auto-train" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="learningRate">Learning Rate</Label>
            <span className="text-xs tabular-nums">{parameters.learningRate.toFixed(4)}</span>
          </div>
          <Slider 
            id="learningRate"
            min={0.0001}
            max={0.1}
            step={0.0001}
            value={[parameters.learningRate]}
            onValueChange={(value) => onParameterChange("learningRate", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="epochs">Epochs</Label>
            <span className="text-xs tabular-nums">{parameters.epochs}</span>
          </div>
          <Slider 
            id="epochs"
            min={1}
            max={100}
            step={1}
            value={[parameters.epochs]}
            onValueChange={(value) => onParameterChange("epochs", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="batchSize">Batch Size</Label>
            <span className="text-xs tabular-nums">{parameters.batchSize}</span>
          </div>
          <Slider 
            id="batchSize"
            min={8}
            max={256}
            step={8}
            value={[parameters.batchSize]}
            onValueChange={(value) => onParameterChange("batchSize", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="optimizer">Optimizer</Label>
          <Select 
            onValueChange={(value) => onParameterChange("optimizer", value)} 
            defaultValue={parameters.optimizer}
            disabled={isTraining}
          >
            <SelectTrigger id="optimizer">
              <SelectValue placeholder="Select optimizer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sgd">SGD</SelectItem>
              <SelectItem value="adam">Adam</SelectItem>
              <SelectItem value="rmsprop">RMSprop</SelectItem>
              <SelectItem value="adagrad">Adagrad</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="hiddenLayers">Hidden Layers</Label>
            <span className="text-xs tabular-nums">{parameters.hiddenLayers}</span>
          </div>
          <Slider 
            id="hiddenLayers"
            min={1}
            max={10}
            step={1}
            value={[parameters.hiddenLayers]}
            onValueChange={(value) => onParameterChange("hiddenLayers", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="neuronsPerLayer">Neurons Per Layer</Label>
            <span className="text-xs tabular-nums">{parameters.neuronsPerLayer}</span>
          </div>
          <Slider 
            id="neuronsPerLayer"
            min={1}
            max={128}
            step={1}
            value={[parameters.neuronsPerLayer]}
            onValueChange={(value) => onParameterChange("neuronsPerLayer", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="regularization">Regularization (L2)</Label>
            <span className="text-xs tabular-nums">{parameters.regularization.toFixed(4)}</span>
          </div>
          <Slider 
            id="regularization"
            min={0}
            max={0.1}
            step={0.0001}
            value={[parameters.regularization]}
            onValueChange={(value) => onParameterChange("regularization", value[0])}
            disabled={isTraining}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="activationFunction">Activation Function</Label>
          <Select 
            onValueChange={(value) => onParameterChange("activationFunction", value)} 
            defaultValue={parameters.activationFunction}
            disabled={isTraining}
          >
            <SelectTrigger id="activationFunction">
              <SelectValue placeholder="Select activation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relu">ReLU</SelectItem>
              <SelectItem value="sigmoid">Sigmoid</SelectItem>
              <SelectItem value="tanh">Tanh</SelectItem>
              <SelectItem value="leaky_relu">Leaky ReLU</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParameterControls;
