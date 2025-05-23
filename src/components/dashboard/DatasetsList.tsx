
import React from "react";
import { Button } from "@/components/ui/button";
import { FileUp, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Dataset {
  id: string;
  name: string;
  rows: number;
  features: string[];
  type: 'sample' | 'custom';
  algorithms: string[];
}

interface DatasetsListProps {
  datasets: Dataset[];
  isLoading: boolean;
  onUploadDataset: () => void;
  onDatasetsChange: (datasets: Dataset[]) => void;
}

const DatasetsList = ({ 
  datasets, 
  isLoading, 
  onUploadDataset,
  onDatasetsChange
}: DatasetsListProps) => {
  const { toast } = useToast();

  const handleDeleteDataset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('datasets')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      // Remove from local state
      const updatedDatasets = datasets.filter(ds => ds.id !== id);
      onDatasetsChange(updatedDatasets);

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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Datasets</h2>
        <Button onClick={onUploadDataset}>
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
        
        {isLoading ? (
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
    </>
  );
};

export default DatasetsList;
