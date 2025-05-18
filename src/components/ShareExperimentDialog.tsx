
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareExperimentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experimentData: Record<string, any>;
}

const ShareExperimentDialog: React.FC<ShareExperimentDialogProps> = ({
  open,
  onOpenChange,
  experimentData,
}) => {
  // In a real app, this would be an actual shareable URL with parameters encoded
  const [shareUrl, setShareUrl] = useState(
    `https://playrithm.app/shared/${experimentData.algorithm.toLowerCase().replace(' ', '-')}?id=${Math.random().toString(36).substring(2, 8)}`
  );
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Experiment</DialogTitle>
          <DialogDescription>
            Share your experiment configuration with others
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="share-url" className="text-sm font-medium">
              Share Link
            </label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button size="icon" variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md bg-muted p-3">
            <h4 className="text-sm font-medium mb-2">Experiment Details</h4>
            <div className="space-y-1">
              <p className="text-xs">
                <span className="font-medium">Algorithm:</span> {experimentData.algorithm}
              </p>
              <p className="text-xs">
                <span className="font-medium">Dataset:</span> {experimentData.dataset}
              </p>
              <p className="text-xs">
                <span className="font-medium">Parameters:</span> Custom configuration
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareExperimentDialog;
