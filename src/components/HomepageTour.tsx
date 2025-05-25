
import React, { useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';
import { useOnboardingTour } from '@/hooks/useOnboardingTour';
import { useAuth } from '@/contexts/AuthContext';

const HomepageTour = () => {
  const { isLoggedIn } = useAuth();
  const { tourState, handleJoyrideCallback, startTour } = useOnboardingTour('homepage');

  const guestSteps: Step[] = [
    {
      target: '.tour-welcome-title',
      content: 'Welcome to PlayRithm! This is your interactive machine learning playground where you can experiment with ML algorithms.',
      placement: 'bottom'
    },
    {
      target: '.tour-start-playground',
      content: 'Click here to start experimenting with machine learning algorithms right away. No registration required!',
      placement: 'top'
    },
    {
      target: '.tour-learn-more',
      content: 'New to machine learning? Click here to learn how algorithms work before diving in.',
      placement: 'top'
    },
    {
      target: '.tour-features',
      content: 'These cards show the key features of PlayRithm: experiment with parameters, visualize results, and learn ML concepts.',
      placement: 'top'
    }
  ];

  const loggedInSteps: Step[] = [
    {
      target: '.tour-welcome-title',
      content: 'Welcome back to PlayRithm! You now have access to advanced features as a registered user.',
      placement: 'bottom'
    },
    {
      target: '.tour-dashboard',
      content: 'Access your personal dashboard to manage saved experiments and datasets.',
      placement: 'top'
    },
    {
      target: '.tour-learn-more',
      content: 'Continue learning about machine learning concepts and best practices.',
      placement: 'top'
    },
    {
      target: '.tour-features',
      content: 'As a registered user, you can now save experiments, upload custom datasets, and track your learning progress.',
      placement: 'top'
    }
  ];

  useEffect(() => {
    const steps = isLoggedIn ? loggedInSteps : guestSteps;
    startTour(steps);
  }, [isLoggedIn]);

  return (
    <Joyride
      steps={tourState.steps}
      run={tourState.run}
      stepIndex={tourState.stepIndex}
      callback={handleJoyrideCallback}
      continuous
      showProgress
      showSkipButton
      styles={{
        options: {
          primaryColor: 'hsl(262, 80%, 65%)',
          backgroundColor: 'hsl(229, 70%, 8%)',
          textColor: 'hsl(210, 40%, 98%)',
          overlayColor: 'rgba(0, 0, 0, 0.5)',
          arrowColor: 'hsl(229, 70%, 8%)',
          zIndex: 10000,
        },
        tooltip: {
          backgroundColor: 'hsl(229, 70%, 8%)',
          color: 'hsl(210, 40%, 98%)',
          border: '1px solid hsl(217, 30%, 18%)',
        },
        tooltipContainer: {
          textAlign: 'left'
        },
        buttonNext: {
          backgroundColor: 'hsl(262, 80%, 65%)',
          color: 'hsl(210, 40%, 98%)',
        },
        buttonBack: {
          color: 'hsl(215, 20%, 65%)',
        },
        buttonSkip: {
          color: 'hsl(215, 20%, 65%)',
        }
      }}
      locale={{
        back: 'Back',
        close: 'Close',
        last: 'Finish',
        next: 'Next',
        skip: 'Skip tour'
      }}
    />
  );
};

export default HomepageTour;
