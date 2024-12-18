'use client'

import { useState, useEffect } from 'react';
import AlgorithmDescription from './algorithm-description';
import AlgorithmVisualization from './algorithm-visualization';

interface AlgorithmLayoutProps {
  algorithmId: string;
}

interface Step {
  text: string;
  state: number;
}

interface AlgorithmContent {
  title: string;
  steps: Step[];
}

export default function AlgorithmLayout({ algorithmId }: AlgorithmLayoutProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentState, setCurrentState] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [content, setContent] = useState<AlgorithmContent>({ title: '', steps: [] });

  useEffect(() => {
    fetch(`../algorithms/${algorithmId}.json`)
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('알고리즘 데이터를 불러오는데 실패했습니다:', error));
  }, [algorithmId]);

  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if(e.cancelable) e.preventDefault();
      if(!touchStart) setTouchStart(e.changedTouches[0].clientY);
      setTouchEnd(e.changedTouches[0].clientY);
    };
  
    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
  
      const distance = touchStart - touchEnd;
      const isSwipeUp = distance > 50;
      const isSwipeDown = distance < -50;
  
      if (isSwipeUp) {
        const newStep = Math.min(content.steps.length - 1, currentStep + 1);
        handleStepChange(newStep, content.steps[newStep]?.state);
      }
      if (isSwipeDown) {
        const newStep = Math.max(0, currentStep - 1);
        handleStepChange(newStep, content.steps[newStep]?.state);
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    // 터치 이벤트 리스너 등록
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    // 전체 페이지 스크롤 방지
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [currentStep, content.steps.length, touchStart, touchEnd]);

  const handleStepChange = (step: number, state?: number) => {
    setCurrentStep(step);
    if (state !== undefined) {
      setCurrentState(state);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen touch-none">
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
          content={content}
          setContent={setContent}
        />
      </div>
    </div>
  );
} 