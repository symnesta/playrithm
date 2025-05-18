
import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, FileUp, Trash2, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectAlgorithmDialog from "@/components/SelectAlgorithmDialog";
import UploadDatasetDialog from "@/components/UploadDatasetDialog";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  // Dialogs state
  const [algorithmDialogOpen, setAlgorithmDialogOpen] = useState(false);
  const [uploadDatasetDialogOpen, setUploadDatasetDialogOpen] = useState(false);
  const { toast } = useToast();

  // Mock saved experiments
  const savedExperiments = [
    { 
      id: "exp1", 
      name: "Linear Regression on Iris", 
      algorithm: "Linear Regression", 
      dataset: "Iris", 
      performance: "R² = 0.87",
      date: "2023-05-12" 
    },
    { 
      id: "exp2", 
      name: "SVM Classification", 
      algorithm: "SVM", 
      dataset: "Moons", 
      performance: "Accuracy: 93%",
      date: "2023-05-15" 
    },
    { 
      id: "exp3", 
      name: "Decision Tree for Titanic", 
      algorithm: "Decision Tree", 
      dataset: "Titanic", 
      performance: "Accuracy: 82%", 
      date: "2023-05-18" 
    },
  ];

  // Mock datasets - now including both sample and custom datasets
  const datasets = [
    { id: "ds1", name: "Iris", rows: 150, features: 4, type: "sample", algorithms: ["logistic-regression", "k-nn", "svm"] },
    { id: "ds2", name: "Boston Housing", rows: 506, features: 13, type: "sample", algorithms: ["linear-regression"] },
    { id: "ds3", name: "Moons", rows: 1000, features: 2, type: "sample", algorithms: ["logistic-regression", "svm", "neural-network"] },
    { id: "ds4", name: "Titanic", rows: 891, features: 10, type: "sample", algorithms: ["decision-tree"] },
    { id: "ds5", name: "Housing Prices", rows: 1460, features: 79, type: "custom", algorithms: ["linear-regression", "neural-network"] },
    { id: "ds6", name: "Customer Churn", rows: 7043, features: 21, type: "custom", algorithms: ["logistic-regression", "decision-tree"] },
  ];

  const handleUploadDataset = (datasetData: {
    name: string;
    description: string;
    algorithms: string[];
    file: File | null;
  }) => {
    console.log("Uploading dataset:", datasetData);
    toast({
      title: "Dataset uploaded",
      description: `${datasetData.name} has been added to your datasets`,
    });
    // In a real app, this would process the file and add to the user's datasets
  };

  const handleDeleteExperiment = (id: string) => {
    console.log("Deleting experiment:", id);
    toast({
      title: "Experiment deleted",
      description: "The experiment has been removed from your saved experiments",
    });
    // In a real app, this would remove the experiment from the user's saved experiments
  };

  const handleDeleteDataset = (id: string) => {
    console.log("Deleting dataset:", id);
    toast({
      title: "Dataset deleted",
      description: "The dataset has been removed from your account",
    });
    // In a real app, this would remove the dataset from the user's datasets
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <Tabs defaultValue="experiments">
            <TabsList className="mb-6">
              <TabsTrigger value="experiments">Saved Experiments</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="experiments">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Saved Experiments</h2>
                <Button onClick={() => setAlgorithmDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Experiment
                </Button>
              </div>
              
              <div className="border rounded-md border-border">
                <div className="grid grid-cols-6 p-4 border-b border-border font-medium">
                  <div className="col-span-2">Name</div>
                  <div>Algorithm</div>
                  <div>Dataset</div>
                  <div>Performance</div>
                  <div>Actions</div>
                </div>
                
                {savedExperiments.length > 0 ? (
                  savedExperiments.map(exp => (
                    <div key={exp.id} className="grid grid-cols-6 p-4 border-b border-border">
                      <div className="col-span-2">{exp.name}</div>
                      <div>{exp.algorithm}</div>
                      <div>{exp.dataset}</div>
                      <div>{exp.performance}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Open
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteExperiment(exp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No saved experiments yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setAlgorithmDialogOpen(true)}
                    >
                      Start your first experiment
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="datasets">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Datasets</h2>
                <Button onClick={() => setUploadDatasetDialogOpen(true)}>
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Dataset
                </Button>
              </div>
              
              <div className="border rounded-md border-border">
                <div className="grid grid-cols-5 p-4 border-b border-border font-medium">
                  <div>Name</div>
                  <div>Type</div>
                  <div>Rows</div>
                  <div>Features</div>
                  <div>Actions</div>
                </div>
                
                {datasets.map(dataset => (
                  <div key={dataset.id} className="grid grid-cols-5 p-4 border-b border-border">
                    <div>{dataset.name}</div>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        dataset.type === 'sample' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {dataset.type}
                      </span>
                    </div>
                    <div>{dataset.rows}</div>
                    <div>{dataset.features}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {dataset.type === 'custom' && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteDataset(dataset.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>

      {/* Dialogs */}
      <SelectAlgorithmDialog 
        open={algorithmDialogOpen} 
        onOpenChange={setAlgorithmDialogOpen} 
      />
      
      <UploadDatasetDialog
        open={uploadDatasetDialogOpen}
        onOpenChange={setUploadDatasetDialogOpen}
        onUpload={handleUploadDataset}
      />
    </div>
  );
};

export default Dashboard;
