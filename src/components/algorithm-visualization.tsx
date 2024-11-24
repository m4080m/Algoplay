'use client'

import { useEffect } from 'react';
import { useRive, StateMachineInput, StateMachineInputType } from '@rive-app/react-canvas';

interface AlgorithmVisualizationProps {
  algorithmId: string;
  currentStep: number;
  currentState: number;
}

export default function AlgorithmVisualization({ 
  algorithmId,
  currentStep,
  currentState 
}: AlgorithmVisualizationProps) {
  const { rive, RiveComponent } = useRive({
    src: `/animations/${algorithmId}.riv`,
    stateMachines: 'State Machine 1',
    autoplay: true,
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && rive) {
        const inputs = rive.stateMachineInputs('State Machine 1');
        const triggerInput = inputs?.find(
          (input: StateMachineInput) => 
            input.name === 'TriggerAnimation' && 
            input.type === StateMachineInputType.Trigger
        );
        
        if (triggerInput) {
          triggerInput.fire();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rive]);

  useEffect(() => {
    if (rive) {
      const inputs = rive.stateMachineInputs('State Machine 1');
      const triggerInput = inputs?.find(
        (input: StateMachineInput) => 
          input.name === `TriggerSlide${currentState}` && 
          input.type === StateMachineInputType.Trigger
      );
      
      if (triggerInput) {
        triggerInput.fire();
      }
    }
  }, [rive, currentState]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <RiveComponent className="w-full h-full" />
    </div>
  );
} 