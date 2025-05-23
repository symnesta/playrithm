import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";

interface Experiment {
  id: string;
  name: string;
  algorithm: string;
  dataset: string;
  performance: Record<string, any>;
  created_at: string;
}

interface ExperimentsListProps {
  experiments: Experiment[];
  isLoading: boolean;
  onNewExperiment: () => void;
  onExperimentsChange: (experiments: Experiment[]) => void;
  className?: string;
}

const ExperimentsList: React.FC<ExperimentsListProps> = ({ 
  experiments, 
  isLoading, 
  onNewExperiment,
  onExperimentsChange,
  className 
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Experiments</h2>
        <Button onClick={onNewExperiment} className={className}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Experiment
        </Button>
      </div>
      
      <div className="border rounded-md border-border">
        <div className="grid grid-cols-4 p-4 border-b border-border font-medium">
          <div>Name</div>
          <div>Algorithm</div>
          <div>Dataset</div>
          <div>Created At</div>
        </div>
        
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading experiments...</p>
          </div>
        ) : (
          experiments.map(experiment => (
            <div key={experiment.id} className="grid grid-cols-4 p-4 border-b border-border">
              <div>{experiment.name}</div>
              <div>{experiment.algorithm}</div>
              <div>{experiment.dataset}</div>
              <div>{experiment.created_at}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ExperimentsList;
