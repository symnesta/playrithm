
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SelectAlgorithmDialog from "@/components/SelectAlgorithmDialog";
import UploadDatasetDialog from "@/components/UploadDatasetDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ExperimentsList from "@/components/dashboard/ExperimentsList";
import DatasetsList from "@/components/dashboard/DatasetsList";
import { useDashboardData, Dataset } from "@/hooks/useDashboardData";
import { DatasetUploadData, useDatasetUploadHandler } from "@/components/dashboard/DatasetUploadHandler";

const Dashboard = () => {
  // Dialogs state
  const [algorithmDialogOpen, setAlgorithmDialogOpen] = useState(false);
  const [uploadDatasetDialogOpen, setUploadDatasetDialogOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Get dashboard data using custom hook
  const {
    experiments,
    datasets,
    isLoadingExperiments,
    isLoadingDatasets,
    setExperiments,
    setDatasets
  } = useDashboardData(user);

  // Dataset upload handler
  const { handleUploadDataset } = useDatasetUploadHandler(user, (newDataset) => {
    setDatasets(prev => [...prev, newDataset]);
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const onUploadDataset = async (datasetData: DatasetUploadData) => {
    const success = await handleUploadDataset(datasetData);
    if (success) {
      setUploadDatasetDialogOpen(false);
    }
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
              <ExperimentsList 
                experiments={experiments}
                isLoading={isLoadingExperiments}
                onNewExperiment={() => setAlgorithmDialogOpen(true)}
                onExperimentsChange={setExperiments}
              />
            </TabsContent>
            
            <TabsContent value="datasets">
              <DatasetsList 
                datasets={datasets}
                isLoading={isLoadingDatasets}
                onUploadDataset={() => setUploadDatasetDialogOpen(true)}
                onDatasetsChange={setDatasets}
              />
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
        onUpload={onUploadDataset}
      />
    </div>
  );
};

export default Dashboard;
