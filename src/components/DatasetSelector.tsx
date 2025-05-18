
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DatasetOption {
  id: string;
  name: string;
  description: string;
  samples: number;
  features: number;
  type: string;
  previewImage?: string;
}

const datasets: DatasetOption[] = [
  {
    id: "mnist",
    name: "MNIST",
    description: "Handwritten digit recognition dataset with 70,000 examples",
    samples: 70000,
    features: 784,
    type: "Image Classification"
  },
  {
    id: "iris",
    name: "Iris",
    description: "Classic dataset of flower measurements for species classification",
    samples: 150,
    features: 4,
    type: "Tabular Classification"
  },
  {
    id: "boston",
    name: "Boston Housing",
    description: "Housing price regression dataset with 506 examples",
    samples: 506,
    features: 13,
    type: "Regression"
  },
  {
    id: "cifar",
    name: "CIFAR-10",
    description: "Image classification with 10 classes and 60,000 examples",
    samples: 60000,
    features: 3072,
    type: "Image Classification"
  }
];

interface DatasetSelectorProps {
  onSelectDataset: (dataset: DatasetOption) => void;
  selectedDataset?: string;
}

const DatasetSelector: React.FC<DatasetSelectorProps> = ({ 
  onSelectDataset, 
  selectedDataset = "mnist" 
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Dataset</CardTitle>
        <CardDescription>
          Select a dataset to train your model
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={selectedDataset}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {datasets.map((dataset) => (
              <TabsTrigger 
                key={dataset.id}
                value={dataset.id}
                onClick={() => onSelectDataset(dataset)}
              >
                {dataset.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {datasets.map((dataset) => (
            <TabsContent key={dataset.id} value={dataset.id}>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Type</span>
                  <span className="bg-secondary/50 rounded-full px-3 py-1 text-xs">
                    {dataset.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Samples</span>
                  <span>{dataset.samples.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Features</span>
                  <span>{dataset.features}</span>
                </div>
                <div className="pt-3">
                  <div className="h-24 bg-muted/30 rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">Dataset Preview</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DatasetSelector;
