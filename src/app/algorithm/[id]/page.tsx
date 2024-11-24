import React from 'react';
import AlgorithmLayout from "@/components/algorithm-layout";

interface AlgorithmPageProps {
  params: {
    id: string;
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const id = await params.id;
  return (
    <div className="min-h-screen">
      <AlgorithmLayout algorithmId={id} />
    </div>
  );
} 