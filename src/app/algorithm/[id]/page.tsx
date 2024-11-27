import React from 'react';
import AlgorithmLayout from "@/components/algorithm-layout";

interface AlgorithmPageProps {
  params: {
    id: string;
  };
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const resolvedParams = await params;
  return (
    <div className="min-h-screen">
      <AlgorithmLayout algorithmId={resolvedParams.id} />
    </div>
  );
} 