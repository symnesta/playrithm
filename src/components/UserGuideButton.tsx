
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useUserGuide } from "@/contexts/UserGuideContext";

interface UserGuideButtonProps {
  className?: string;
}

const UserGuideButton: React.FC<UserGuideButtonProps> = ({ className }) => {
  const { startGuide, isGuideActive, currentPageGuide } = useUserGuide();
  
  // Only show the button if there's a guide available for this page
  if (currentPageGuide.length === 0) {
    return null;
  }
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={startGuide}
      disabled={isGuideActive}
    >
      <HelpCircle className="mr-2 h-4 w-4" />
      Page Guide
    </Button>
  );
};

export default UserGuideButton;
