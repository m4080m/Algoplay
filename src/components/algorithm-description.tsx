'use client'

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Step {
  text: string;
  state: number;
}

interface AlgorithmContent {
  title: string;
  steps: Step[];
}

interface AlgorithmDescriptionProps {
  algorithmId: string;
  currentStep: number;
  onStepChange: (step: number, state: number) => void;
}

export default function AlgorithmDescription({ 
  algorithmId,
  currentStep, 
  onStepChange 
}: AlgorithmDescriptionProps) {
  const [content, setContent] = useState<AlgorithmContent>({
    title: '',
    steps: []
  });
  
  const lastScrollTime = useRef<number>(Date.now());
  const SCROLL_COOLDOWN = 500;
  
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    fetch(`/algorithms/${algorithmId}.json`)
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('알고리즘 데이터를 불러오는데 실패했습니다:', error));
  }, [algorithmId]);

  useEffect(() => {
    paragraphRefs.current = paragraphRefs.current.slice(0, content.steps.length);
  }, [content.steps]);

  useEffect(() => {
    const currentParagraph = paragraphRefs.current[currentStep];
    const container = containerRef.current;
    
    if (currentParagraph && container) {
      const paragraphTop = currentParagraph.offsetTop;
      const containerHeight = container.clientHeight;
      const paragraphHeight = currentParagraph.clientHeight;
      
      const scrollPosition = paragraphTop - (containerHeight / 2) + (paragraphHeight / 2);
      
      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const now = Date.now();
      
      if (now - lastScrollTime.current >= SCROLL_COOLDOWN) {
        if (event.deltaY > 0) {
          const newStep = Math.min(content.steps.length - 1, currentStep + 1);
          if (newStep !== currentStep) {
            onStepChange(newStep, content.steps[newStep]?.state);
            lastScrollTime.current = now;
          }
        } else if (event.deltaY < 0) {
          const newStep = Math.max(0, currentStep - 1);
          if (newStep !== currentStep) {
            onStepChange(newStep, content.steps[newStep]?.state);
            lastScrollTime.current = now;
          }
        }
      }
      
      event.preventDefault();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentStep, onStepChange, content.steps]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const newStep = Math.max(0, currentStep - 1);
        onStepChange(newStep, content.steps[newStep]?.state);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        const newStep = Math.min(content.steps.length - 1, currentStep + 1);
        onStepChange(newStep, content.steps[newStep]?.state);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, onStepChange, content.steps]);

  const setParagraphRef = (index: number) => (el: HTMLParagraphElement | null) => {
    paragraphRefs.current[index] = el;
  };

  return (
    <div 
      ref={containerRef}
      className="p-6 space-y-4 overflow-y-auto h-full"
    >
      <div className="flex items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          ← 목록으로
        </Link>
        <h1 className="text-2xl font-bold">{content.title}</h1>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        ↑↓ 화살표 키나 스크롤을 사용하여 단계를 이동할 수 있습니다
      </div>
      {content.steps.map((step, index) => (
        <p
          key={index}
          ref={setParagraphRef(index)}
          className={`p-4 rounded transition-opacity duration-300 ${
            currentStep === index
              ? "opacity-100"
              : "opacity-30"
          }`}
        >
          {step.text}
        </p>
      ))}
    </div>
  );
} 