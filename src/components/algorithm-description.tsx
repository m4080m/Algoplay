'use client'

import React, { useEffect, useRef } from 'react';
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
  content: AlgorithmContent;
  setContent: React.Dispatch<React.SetStateAction<AlgorithmContent>>;
}

export const isTouchScreen =
  typeof window !== 'undefined' 
  && window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export default function AlgorithmDescription({ 
  currentStep, 
  onStepChange,
  content
}: AlgorithmDescriptionProps) {
  const lastScrollTime = useRef<number>(Date.now());
  const SCROLL_COOLDOWN = 500;
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]);

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
      
      let scrollPosition;
      if (isTouchScreen) {
        // 모바일: 화면 하단에 위치
        scrollPosition = paragraphTop - (containerHeight * 1.4);
      } else {
        // 데스크톱: 화면 중앙에 위치
        scrollPosition = paragraphTop - (containerHeight * 0.5) + (paragraphHeight * 0.5);
      }
      
      container.scrollTo({
        top: Math.max(0, scrollPosition),
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
          className="text-base text-blue-600 hover:text-blue-800"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold">{content.title}</h1>
      </div>
      <div className="text-base text-gray-500 mb-4">
        ↑↓ 화살표 키, 스크롤 또는 스와이프로 단계를 이동할 수 있습니다
      </div>
      {content.steps.map((step, index) => (
        <p
          key={index}
          ref={setParagraphRef(index)}
          className={`p-4 rounded transition-opacity duration-300 text-lg leading-relaxed ${
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