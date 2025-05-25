
import { useState, useEffect } from 'react';
import { Step } from 'react-joyride';

export interface OnboardingTourState {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

export const useOnboardingTour = (tourKey: string) => {
  const [tourState, setTourState] = useState<OnboardingTourState>({
    run: false,
    stepIndex: 0,
    steps: []
  });

  // Check if user has completed this tour before
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem(`tour_completed_${tourKey}`);
    if (!hasCompletedTour) {
      // Small delay to ensure DOM elements are ready
      setTimeout(() => {
        setTourState(prev => ({ ...prev, run: true }));
      }, 1000);
    }
  }, [tourKey]);

  const handleJoyrideCallback = (data: any) => {
    const { status, type } = data;
    
    if (type === 'step:after' || type === 'target:not-found') {
      setTourState(prev => ({ ...prev, stepIndex: data.index + 1 }));
    }

    if (status === 'finished' || status === 'skipped') {
      setTourState(prev => ({ ...prev, run: false }));
      localStorage.setItem(`tour_completed_${tourKey}`, 'true');
    }
  };

  const startTour = (steps: Step[]) => {
    setTourState({
      run: true,
      stepIndex: 0,
      steps
    });
  };

  const skipTour = () => {
    setTourState(prev => ({ ...prev, run: false }));
    localStorage.setItem(`tour_completed_${tourKey}`, 'true');
  };

  return {
    tourState,
    handleJoyrideCallback,
    startTour,
    skipTour
  };
};
