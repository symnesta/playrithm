import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserGuide } from "@/contexts/UserGuideContext";
import { Portal } from "@/components/ui/portal";
import { MoveRight, X } from "lucide-react";

const UserGuideTooltip: React.FC = () => {
  const { 
    activeStep, 
    currentPageGuide, 
    nextStep, 
    skipGuide,
    isGuideActive
  } = useUserGuide();
  
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isGuideActive) return;
    
    const currentStep = currentPageGuide[activeStep];
    if (!currentStep) return;
    
    const targetElement = document.querySelector(currentStep.target);
    if (!targetElement || !tooltipRef.current) return;
    
    // Calculate position based on the target element and position preference
    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top = 0;
    let left = 0;
    
    switch (currentStep.position) {
      case "top":
        top = targetRect.top - tooltipRect.height - 10;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case "bottom":
        top = targetRect.bottom + 10;
        left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
        break;
      case "left":
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.left - tooltipRect.width - 10;
        break;
      case "right":
        top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
        left = targetRect.right + 10;
        break;
      default:
        top = targetRect.bottom + 10;
        left = targetRect.left;
    }
    
    // Adjust position to keep tooltip within viewport
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    
    if (top < 10) top = 10;
    if (top + tooltipRect.height > window.innerHeight - 10) {
      top = window.innerHeight - tooltipRect.height - 10;
    }
    
    setPosition({ top, left });
    
    // Add highlight to the target element
    targetElement.classList.add("guide-highlighted");
    
    return () => {
      // Remove highlight when step changes
      targetElement.classList.remove("guide-highlighted");
    };
  }, [activeStep, currentPageGuide, isGuideActive]);
  
  if (!isGuideActive || !currentPageGuide[activeStep]) {
    return null;
  }
  
  const currentStep = currentPageGuide[activeStep];
  const isLastStep = activeStep === currentPageGuide.length - 1;
  
  return (
    <Portal>
      <div 
        ref={tooltipRef}
        className="fixed z-50 w-72 bg-card border border-border shadow-lg rounded-lg p-4 animate-fade-in"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{currentStep.title}</h3>
          <Button variant="ghost" size="icon" onClick={skipGuide} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">{currentStep.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            {activeStep + 1}/{currentPageGuide.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={skipGuide}>
              Skip
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? 'Finish' : 'Next'}
              {!isLastStep && <MoveRight className="ml-1 h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default UserGuideTooltip;
