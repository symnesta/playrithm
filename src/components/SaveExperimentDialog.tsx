
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SaveExperimentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  algorithmType: string;
  datasetName: string;
  parameters: Record<string, any>;
  performance?: string;
  onSave: (experimentName: string) => void;
}

const SaveExperimentDialog: React.FC<SaveExperimentDialogProps> = ({
  open,
  onOpenChange,
  algorithmType,
  datasetName,
  parameters,
  performance,
  onSave,
}) => {
  const [experimentName, setExperimentName] = useState(`${algorithmType} on ${datasetName}`);
  const { toast } = useToast();

  const handleSave = () => {
    if (!experimentName.trim()) {
      toast({
        title: "Error",
        description: "Please provide an experiment name",
        variant: "destructive",
      });
      return;
    }

    onSave(experimentName);
    toast({
      title: "Experiment saved",
      description: "Your experiment has been saved to your dashboard",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Experiment</DialogTitle>
          <DialogDescription>
            Save your current experiment configuration to your dashboard.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="experiment-name" className="text-right text-sm font-medium">
              Name
            </label>
            <Input
              id="experiment-name"
              value={experimentName}
              onChange={(e) => setExperimentName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium">Algorithm</span>
            <span className="col-span-3 text-sm">{algorithmType}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium">Dataset</span>
            <span className="col-span-3 text-sm">{datasetName}</span>
          </div>
          {performance && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right text-sm font-medium">Performance</span>
              <span className="col-span-3 text-sm">{performance}</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveExperimentDialog;
