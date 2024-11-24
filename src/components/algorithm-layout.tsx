'use client'

import { useState } from 'react';
import AlgorithmDescription from './algorithm-description';
import AlgorithmVisualization from './algorithm-visualization';

interface AlgorithmLayoutProps {
  algorithmId: string;
}

export default function AlgorithmLayout({ algorithmId }: AlgorithmLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentState, setCurrentState] = useState(0);

  const handleStepChange = (step: number, state: number) => {
    setCurrentStep(step);
    setCurrentState(state);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen overflow-y-auto border-r">
        <AlgorithmDescription 
          algorithmId={algorithmId}
          currentStep={currentStep}
          onStepChange={handleStepChange}
        />
      </div>
      
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen">
        <AlgorithmVisualization 
          algorithmId={algorithmId}
          currentStep={currentStep}
          currentState={currentState}
        />
      </div>
    </div>
  );
} 