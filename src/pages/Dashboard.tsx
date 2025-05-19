
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus, FileUp, Trash2, Play } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectAlgorithmDialog from "@/components/SelectAlgorithmDialog";
import UploadDatasetDialog from "@/components/UploadDatasetDialog";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Experiment {
  id: string;
  name: string;
  algorithm: string;
  dataset: string;
  performance: Record<string, any>;
  created_at: string;
}

interface Dataset {
  id: string;
  name: string;
  rows: number;
  features: string[];
  type: 'sample' | 'custom';
  algorithms: string[];
}

const Dashboard = () => {
  // Dialogs state
  const [algorithmDialogOpen, setAlgorithmDialogOpen] = useState(false);
  const [uploadDatasetDialogOpen, setUploadDatasetDialogOpen] = useState(false);
  const { toast } = useToast();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Data state
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [isLoadingExperiments, setIsLoadingExperiments] = useState(true);
  const [isLoadingDatasets, setIsLoadingDatasets] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Fetch experiments
  useEffect(() => {
    const fetchExperiments = async () => {
      if (!user) return;
      
      try {
        setIsLoadingExperiments(true);
        const { data, error } = await supabase
          .from('experiments')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Transform data to match experiment interface
        const formattedExperiments = data.map(exp => ({
          id: exp.id,
          name: exp.name,
          algorithm: exp.algorithm,
          dataset: exp.dataset,
          performance: exp.performance || {},
          created_at: exp.created_at
        }));

        setExperiments(formattedExperiments);
      } catch (error) {
        console.error('Error fetching experiments:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your experiments',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingExperiments(false);
      }
    };

    fetchExperiments();
  }, [user, toast]);

  // Fetch datasets
  useEffect(() => {
    const fetchDatasets = async () => {
      if (!user) return;
      
      try {
        setIsLoadingDatasets(true);
        const { data, error } = await supabase
          .from('datasets')
          .select('*')
          .or(`user_id.eq.${user.id},public.eq.true`);

        if (error) {
          throw error;
        }

        // Sample datasets (hardcoded as they come from the system)
        const sampleDatasets: Dataset[] = [
          { id: 'ds1', name: 'Iris', rows: 150, features: ['sepal_length', 'sepal_width', 'petal_length', 'petal_width'], type: 'sample', algorithms: ['logistic-regression', 'k-nn', 'svm'] },
          { id: 'ds2', name: 'Boston Housing', rows: 506, features: ['CRIM', 'ZN', 'INDUS', 'CHAS', 'NOX', 'RM', 'AGE', 'DIS', 'RAD', 'TAX', 'PTRATIO', 'B', 'LSTAT'], type: 'sample', algorithms: ['linear-regression'] },
          { id: 'ds3', name: 'Moons', rows: 1000, features: ['X', 'Y'], type: 'sample', algorithms: ['logistic-regression', 'svm', 'neural-network'] },
          { id: 'ds4', name: 'Titanic', rows: 891, features: ['PassengerId', 'Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked'], type: 'sample', algorithms: ['decision-tree'] },
        ];

        // Transform custom datasets to match Dataset interface
        const customDatasets: Dataset[] = data.map(ds => ({
          id: ds.id,
          name: ds.name,
          rows: Array.isArray(ds.data) ? ds.data.length : 0,
          features: ds.features,
          type: 'custom',
          algorithms: ds.suitable_algorithms
        }));

        // Combine sample and custom datasets
        setDatasets([...sampleDatasets, ...customDatasets]);
      } catch (error) {
        console.error('Error fetching datasets:', error);
        toast({
          title: 'Error',
          description: 'Failed to load datasets',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingDatasets(false);
      }
    };

    fetchDatasets();
  }, [user, toast]);

  const handleUploadDataset = async (datasetData: {
    name: string;
    description: string;
    algorithms: string[];
    file: File | null;
  }) => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'You must be logged in to upload a dataset',
        variant: 'destructive',
      });
      return;
    }

    if (!datasetData.file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Read the file content
      const fileContent = await datasetData.file.text();
      let data;
      
      try {
        // Try to parse as JSON
        data = JSON.parse(fileContent);
      } catch {
        // If not JSON, attempt to parse as CSV (simplified)
        const lines = fileContent.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim());
          const row: Record<string, string> = {};
          
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          
          return row;
        });
      }

      // Determine features from the first row
      const features = data && data.length > 0 ? Object.keys(data[0]) : [];

      // Insert into the database
      const { data: insertedData, error } = await supabase
        .from('datasets')
        .insert({
          name: datasetData.name,
          description: datasetData.description || null,
          data,
          features,
          suitable_algorithms: datasetData.algorithms,
          user_id: user.id,
          public: false
        })
        .select();

      if (error) {
        throw error;
      }

      // Add to local state
      if (insertedData && insertedData.length > 0) {
        const newDataset: Dataset = {
          id: insertedData[0].id,
          name: insertedData[0].name,
          rows: Array.isArray(data) ? data.length : 0,
          features,
          type: 'custom',
          algorithms: datasetData.algorithms
        };

        setDatasets(prev => [...prev, newDataset]);
      }

      toast({
        title: 'Dataset uploaded',
        description: `${datasetData.name} has been added to your datasets`,
      });

      // Close the dialog
      setUploadDatasetDialogOpen(false);
    } catch (error) {
      console.error('Error uploading dataset:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your dataset',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteExperiment = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('experiments')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setExperiments(prev => prev.filter(exp => exp.id !== id));

      toast({
        title: 'Experiment deleted',
        description: 'The experiment has been removed from your saved experiments',
      });
    } catch (error) {
      console.error('Error deleting experiment:', error);
      toast({
        title: 'Delete failed',
        description: 'There was an error deleting the experiment',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteDataset = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('datasets')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      setDatasets(prev => prev.filter(ds => ds.id !== id));

      toast({
        title: 'Dataset deleted',
        description: 'The dataset has been removed from your account',
      });
    } catch (error) {
      console.error('Error deleting dataset:', error);
      toast({
        title: 'Delete failed',
        description: 'There was an error deleting the dataset',
        variant: 'destructive',
      });
    }
  };

  const formatPerformance = (performance: Record<string, any>) => {
    if (!performance || Object.keys(performance).length === 0) {
      return 'N/A';
    }

    // Format based on algorithm type
    if ('r2' in performance) {
      return `R² = ${Number(performance.r2).toFixed(2)}`;
    } else if ('accuracy' in performance) {
      return `Accuracy: ${Number(performance.accuracy * 100).toFixed(0)}%`;
    } else if ('error' in performance) {
      return `Error: ${Number(performance.error).toFixed(2)}`;
    }

    // Default fallback
    const firstKey = Object.keys(performance)[0];
    return `${firstKey}: ${performance[firstKey]}`;
  };

  // Render loading state
  if (!isLoggedIn) {
    return null; // Will redirect to login
  }

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
                
                {isLoadingExperiments ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading your experiments...</p>
                  </div>
                ) : experiments.length > 0 ? (
                  experiments.map(exp => (
                    <div key={exp.id} className="grid grid-cols-6 p-4 border-b border-border">
                      <div className="col-span-2">{exp.name}</div>
                      <div>{exp.algorithm}</div>
                      <div>{exp.dataset}</div>
                      <div>{formatPerformance(exp.performance)}</div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/algorithms/${exp.algorithm.toLowerCase().replace(' ', '-')}`)}
                        >
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
                
                {isLoadingDatasets ? (
                  <div className="p-8 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading datasets...</p>
                  </div>
                ) : (
                  datasets.map(dataset => (
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
                      <div>{dataset.features.length}</div>
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
                  ))
                )}
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
