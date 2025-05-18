
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UploadDatasetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpload: (dataset: {
    name: string;
    description: string;
    algorithms: string[];
    file: File | null;
  }) => void;
}

const UploadDatasetDialog: React.FC<UploadDatasetDialogProps> = ({
  open,
  onOpenChange,
  onUpload,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [algorithms, setAlgorithms] = useState<string[]>([]);
  const { toast } = useToast();

  const algorithmOptions = [
    { id: "linear-regression", label: "Linear Regression" },
    { id: "logistic-regression", label: "Logistic Regression" },
    { id: "decision-tree", label: "Decision Tree" },
    { id: "k-nn", label: "k-Nearest Neighbors" },
    { id: "svm", label: "Support Vector Machine" },
    { id: "neural-network", label: "Neural Network" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAlgorithmToggle = (algorithmId: string) => {
    setAlgorithms((prev) =>
      prev.includes(algorithmId)
        ? prev.filter((id) => id !== algorithmId)
        : [...prev, algorithmId]
    );
  };

  const handleUpload = () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Please provide a dataset name",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    if (algorithms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one algorithm",
        variant: "destructive",
      });
      return;
    }

    onUpload({ name, description, algorithms, file });
    toast({
      title: "Dataset uploaded",
      description: "Your dataset has been successfully uploaded",
    });
    
    // Reset form
    setName("");
    setDescription("");
    setFile(null);
    setAlgorithms([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Dataset</DialogTitle>
          <DialogDescription>
            Upload your own dataset to use with the machine learning algorithms.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="dataset-name">Dataset Name</Label>
            <Input
              id="dataset-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Custom Dataset"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="dataset-description">Description (optional)</Label>
            <Input
              id="dataset-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your dataset"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="dataset-file">Upload File (CSV, JSON)</Label>
            <Input
              id="dataset-file"
              type="file"
              onChange={handleFileChange}
              accept=".csv,.json,.xlsx"
            />
            {!file && (
              <p className="text-xs text-muted-foreground">
                Supported formats: CSV, JSON, Excel
              </p>
            )}
            {file && (
              <p className="text-xs text-green-600">
                File selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            )}
          </div>
          
          <div className="grid gap-2">
            <Label>Compatible Algorithms</Label>
            <div className="grid grid-cols-2 gap-2">
              {algorithmOptions.map((algorithm) => (
                <div key={algorithm.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`algorithm-${algorithm.id}`}
                    checked={algorithms.includes(algorithm.id)}
                    onCheckedChange={() => handleAlgorithmToggle(algorithm.id)}
                  />
                  <label
                    htmlFor={`algorithm-${algorithm.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {algorithm.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Dataset
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDatasetDialog;
