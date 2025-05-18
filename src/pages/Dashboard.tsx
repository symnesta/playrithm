
import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, FileUp, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
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

  // Mock user datasets
  const userDatasets = [
    { id: "ds1", name: "Housing Prices", rows: 1460, features: 79 },
    { id: "ds2", name: "Customer Churn", rows: 7043, features: 21 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
          
          <Tabs defaultValue="experiments">
            <TabsList className="mb-6">
              <TabsTrigger value="experiments">Saved Experiments</TabsTrigger>
              <TabsTrigger value="datasets">Your Datasets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="experiments">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Saved Experiments</h2>
                <Button>
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
                
                {savedExperiments.map(exp => (
                  <div key={exp.id} className="grid grid-cols-6 p-4 border-b border-border">
                    <div className="col-span-2">{exp.name}</div>
                    <div>{exp.algorithm}</div>
                    <div>{exp.dataset}</div>
                    <div>{exp.performance}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Open
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="datasets">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Datasets</h2>
                <Button>
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload Dataset
                </Button>
              </div>
              
              <div className="border rounded-md border-border">
                <div className="grid grid-cols-4 p-4 border-b border-border font-medium">
                  <div>Name</div>
                  <div>Rows</div>
                  <div>Features</div>
                  <div>Actions</div>
                </div>
                
                {userDatasets.map(dataset => (
                  <div key={dataset.id} className="grid grid-cols-4 p-4 border-b border-border">
                    <div>{dataset.name}</div>
                    <div>{dataset.rows}</div>
                    <div>{dataset.features}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
    </div>
  );
};

export default Dashboard;
