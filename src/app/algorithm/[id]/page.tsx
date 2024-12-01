import React from 'react';
import AlgorithmLayout from "@/components/algorithm-layout";

interface AlgorithmPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  // TODO: fetch from index.json
  return [{ id: 'bfs-search' }, { id: 'bubble-sort' }, { id: 'quick-sort' }]
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const {id} = await params;
  return (
    <div className="min-h-screen">
      <AlgorithmLayout algorithmId={id} />
    </div>
  );
} 