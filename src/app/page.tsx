'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Algorithm {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface AlgorithmList {
  algorithms: Algorithm[];
}

export default function Home() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);

  useEffect(() => {
    fetch('/algoplay/algorithms/index.json')
      .then(response => response.json())
      .then((data: AlgorithmList) => setAlgorithms(data.algorithms))
      .catch(error => console.error('알고리즘 목록을 불러오는데 실패했습니다:', error));
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">알고리즘 시각화 플랫폼</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <Link 
            href={`/algorithm/${algo.id}`} 
            key={algo.id}
            className="group p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-col gap-2">
              <span className="text-base text-blue-600">{algo.category}</span>
              <h2 className="text-2xl font-semibold group-hover:text-blue-600 transition-colors">
                {algo.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {algo.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
