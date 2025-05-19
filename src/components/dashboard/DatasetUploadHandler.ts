
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Dataset } from "@/hooks/useDashboardData";

export interface DatasetUploadData {
  name: string;
  description: string;
  algorithms: string[];
  file: File | null;
}

export const useDatasetUploadHandler = (user: User | null, onDatasetAdded: (dataset: Dataset) => void) => {
  const { toast } = useToast();

  const handleUploadDataset = async (datasetData: DatasetUploadData) => {
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

        onDatasetAdded(newDataset);
      }

      toast({
        title: 'Dataset uploaded',
        description: `${datasetData.name} has been added to your datasets`,
      });

      return true;
    } catch (error) {
      console.error('Error uploading dataset:', error);
      toast({
        title: 'Upload failed',
        description: 'There was an error uploading your dataset',
        variant: 'destructive',
      });
      return false;
    }
  };

  return { handleUploadDataset };
};
