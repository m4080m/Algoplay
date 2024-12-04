'use client'

import { useState, useEffect } from 'react';
import AlgorithmDescription from './algorithm-description';
import AlgorithmVisualization from './algorithm-visualization';

interface AlgorithmLayoutProps {
  algorithmId: string;
}

export default function AlgorithmLayout({ algorithmId }: AlgorithmLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [stepsLength, setStepsLength] = useState(0);

  // 터치 이벤트 처리
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipeUp = distance > 50;
    const isSwipeDown = distance < -50;

    if (isSwipeUp) {
      const newStep = Math.min(stepsLength - 1, currentStep + 1);
      handleStepChange(newStep);
    }
    if (isSwipeDown) {
      const newStep = Math.max(0, currentStep - 1);
      handleStepChange(newStep);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    // 터치 이벤트 리스너 등록
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentStep, stepsLength]);

  const handleStepChange = (step: number, state?: number) => {
    setCurrentStep(step);
    if (state !== undefined) {
      setCurrentState(state);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* 시각화 섹션 */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen">
        <AlgorithmVisualization 
          algorithmId={algorithmId}
          currentState={currentState}
        />
      </div>
      
      {/* 설명 섹션 */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen overflow-y-auto border-t lg:border-t-0 lg:border-l">
        <AlgorithmDescription 
          algorithmId={algorithmId}
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onStepsLengthChange={setStepsLength}
        />
      </div>
    </div>
  );
} 