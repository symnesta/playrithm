
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Play, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
}

const ExperimentsList = ({ 
  experiments, 
  isLoading, 
  onNewExperiment,
  onExperimentsChange 
}: ExperimentsListProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteExperiment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('experiments')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      const updatedExperiments = experiments.filter(exp => exp.id !== id);
      onExperimentsChange(updatedExperiments);

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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Experiments</h2>
        <Button onClick={onNewExperiment}>
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
        
        {isLoading ? (
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
              onClick={onNewExperiment}
            >
              Start your first experiment
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ExperimentsList;
