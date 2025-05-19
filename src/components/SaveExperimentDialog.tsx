
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
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
  performance?: Record<string, any>;
  onSave?: (experimentName: string) => void;
}

const SaveExperimentDialog: React.FC<SaveExperimentDialogProps> = ({
  open,
  onOpenChange,
  algorithmType,
  datasetName,
  parameters,
  performance = {},
  onSave,
}) => {
  const [experimentName, setExperimentName] = useState(`${algorithmType} on ${datasetName}`);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSave = async () => {
    if (!experimentName.trim()) {
      toast({
        title: "Error",
        description: "Please provide an experiment name",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save experiments",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);

      // Save to Supabase
      const { data, error } = await supabase
        .from('experiments')
        .insert({
          name: experimentName,
          algorithm: algorithmType,
          dataset: datasetName,
          parameters,
          performance,
          user_id: user.id,
        })
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Experiment saved",
        description: "Your experiment has been saved to your dashboard",
      });

      // Call onSave if provided
      if (onSave) {
        onSave(experimentName);
      }

      onOpenChange(false);
    } catch (error: any) {
      console.error("Error saving experiment:", error);
      toast({
        title: "Save failed",
        description: error.message || "There was an error saving your experiment",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
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
              disabled={isSaving}
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
          {Object.keys(performance || {}).length > 0 && (
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="text-right text-sm font-medium">Performance</span>
              <span className="col-span-3 text-sm">
                {Object.entries(performance || {}).map(([key, value]) => (
                  <div key={key}>
                    {key}: {typeof value === 'number' ? value.toFixed(3) : value}
                  </div>
                ))}
              </span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveExperimentDialog;
