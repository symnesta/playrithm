
import React, { useState } from "react";
import AlgorithmPage from "@/components/AlgorithmPage";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayIcon } from "lucide-react";

const NeuralNetwork = () => {
  const [learningRate, setLearningRate] = useState(0.001);
  const [epochs, setEpochs] = useState(50);
  const [hiddenLayers, setHiddenLayers] = useState(2);
  const [neuronsPerLayer, setNeuronsPerLayer] = useState(16);
  const [batchSize, setBatchSize] = useState(32);
  const [activationFunction, setActivationFunction] = useState("relu");
  const [optimizer, setOptimizer] = useState("adam");
  const [selectedDataset, setSelectedDataset] = useState("mnist");
  
  const datasets = [
    { id: "mnist", name: "MNIST", description: "Handwritten digit recognition", features: "28x28 images", samples: 70000 },
    { id: "fashion_mnist", name: "Fashion MNIST", description: "Clothing item classification", features: "28x28 images", samples: 70000 },
    { id: "cifar10", name: "CIFAR-10", description: "Object recognition in images", features: "32x32 color images", samples: 60000 },
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
                <p className="mt-1">{dataset.features}, {dataset.samples} samples</p>
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
          min={0.0001}
          max={0.1}
          step={0.0001}
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
          min={5}
          max={100}
          step={1}
          value={[epochs]}
          onValueChange={(value) => setEpochs(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="hidden-layers">Hidden Layers</Label>
          <span className="text-sm text-muted-foreground">{hiddenLayers}</span>
        </div>
        <Slider 
          id="hidden-layers"
          min={1}
          max={5}
          step={1}
          value={[hiddenLayers]}
          onValueChange={(value) => setHiddenLayers(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="neurons">Neurons per Layer</Label>
          <span className="text-sm text-muted-foreground">{neuronsPerLayer}</span>
        </div>
        <Slider 
          id="neurons"
          min={4}
          max={128}
          step={4}
          value={[neuronsPerLayer]}
          onValueChange={(value) => setNeuronsPerLayer(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="batch-size">Batch Size</Label>
          <span className="text-sm text-muted-foreground">{batchSize}</span>
        </div>
        <Slider 
          id="batch-size"
          min={8}
          max={128}
          step={8}
          value={[batchSize]}
          onValueChange={(value) => setBatchSize(value[0])} 
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activation">Activation Function</Label>
        <Select value={activationFunction} onValueChange={setActivationFunction}>
          <SelectTrigger id="activation">
            <SelectValue placeholder="Select activation function" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relu">ReLU</SelectItem>
            <SelectItem value="sigmoid">Sigmoid</SelectItem>
            <SelectItem value="tanh">Tanh</SelectItem>
            <SelectItem value="leaky_relu">Leaky ReLU</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="optimizer">Optimizer</Label>
        <Select value={optimizer} onValueChange={setOptimizer}>
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
          Select a dataset and adjust parameters to visualize neural network training.
        </p>
        <div className="w-full h-64 bg-muted/30 rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">
            Neural network visualization will appear here
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <AlgorithmPage
      title="Neural Network"
      description="Multi-layer perceptron for complex pattern recognition and classification"
      datasetSelector={DatasetSelector}
      parametersPanel={ParametersPanel}
      visualizationPanel={VisualizationPanel}
    >
      <div className="bg-card p-4 rounded-lg border border-border">
        <h3 className="text-lg font-medium mb-4">About Neural Networks</h3>
        <p className="text-muted-foreground">
          Neural networks are computational models inspired by the structure and function of biological 
          neural networks. They consist of layers of interconnected nodes (neurons) that can learn 
          complex patterns from data.
        </p>
        <h4 className="text-md font-medium mt-4 mb-2">Parameters Explained</h4>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="font-medium">Learning Rate</span>: Controls how quickly the network updates 
            its parameters during training. Too high can cause unstable training, too low can lead to slow convergence.
          </li>
          <li>
            <span className="font-medium">Hidden Layers</span>: The number of layers between input and output. 
            More layers can learn more complex patterns but risk overfitting.
          </li>
          <li>
            <span className="font-medium">Neurons per Layer</span>: The number of nodes in each hidden layer. 
            More neurons increase model capacity but require more data and computation.
          </li>
          <li>
            <span className="font-medium">Batch Size</span>: The number of training examples used in one iteration. 
            Affects training speed and the stability of the optimization process.
          </li>
          <li>
            <span className="font-medium">Activation Function</span>: The mathematical function that determines 
            the output of a neuron. Different functions have different properties and use cases.
          </li>
          <li>
            <span className="font-medium">Optimizer</span>: The algorithm used to update the network weights 
            during training. Different optimizers have different convergence properties.
          </li>
        </ul>
      </div>
    </AlgorithmPage>
  );
};

export default NeuralNetwork;
