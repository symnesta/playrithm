
import React, { ReactNode, useState } from "react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Save, Share } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import SaveExperimentDialog from "./SaveExperimentDialog";
import ShareExperimentDialog from "./ShareExperimentDialog";

interface AlgorithmPageProps {
  title: string;
  description: string;
  children: ReactNode;
  visualizationPanel: ReactNode;
  parametersPanel: ReactNode;
  datasetSelector: ReactNode;
}

const AlgorithmPage = ({
  title,
  description,
  children,
  visualizationPanel,
  parametersPanel,
  datasetSelector,
}: AlgorithmPageProps) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  
  // Sample data to be passed to the dialogs
  const experimentData = {
    algorithm: title,
    dataset: "Sample Dataset", // This should be updated with the actual selected dataset
    parameters: {} // This should be updated with the actual parameters
  };

  // Redirect guest users to login if they attempt certain actions
  const handleGuestAction = () => {
    navigate("/login");
  };

  const handleSaveExperiment = (experimentName: string) => {
    console.log("Saving experiment:", experimentName);
    // In a real app, this would save the experiment to the user's account
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
            
            {/* Only show save/share buttons for logged-in users */}
            {isLoggedIn ? (
              <div className="flex gap-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" onClick={() => setSaveDialogOpen(true)}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShareDialogOpen(true)}>
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={handleGuestAction}>
                Log in to save progress
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Panel - Dataset and Parameters */}
            <div className="space-y-6">
              {/* Dataset Selector */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-4">Dataset</h3>
                {datasetSelector}
              </div>
              
              {/* Parameters Panel */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="text-lg font-medium mb-4">Parameters</h3>
                {parametersPanel}
              </div>
            </div>
            
            {/* Right Panel - Visualization and Results */}
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-card p-4 rounded-lg border border-border">
                {visualizationPanel}
              </div>
              
              {/* Additional Content */}
              {children}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border p-4 text-center text-sm text-muted-foreground">
        <p>PlayRithm - Interactive Machine Learning Playground</p>
      </footer>
      
      {/* Dialogs */}
      <SaveExperimentDialog
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        algorithmType={title}
        datasetName={experimentData.dataset}
        parameters={experimentData.parameters}
        onSave={handleSaveExperiment}
      />
      
      <ShareExperimentDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        experimentData={experimentData}
      />
    </div>
  );
};

export default AlgorithmPage;
