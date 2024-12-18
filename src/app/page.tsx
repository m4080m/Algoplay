'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    fetch('algorithms/index.json')
      .then(response => response.json())
      .then((data: AlgorithmList) => setAlgorithms(data.algorithms))
      .catch(error => console.error('알고리즘 목록을 불러오는데 실패했습니다:', error));
  }, []);

  return (
    <div className="min-h-screen px-16 py-12 max-w-7xl mx-auto">
      <div className="relative w-full mb-12 flex justify-center">
        <Image
          src="banner.png"
          alt="알고리즘 시각화 플랫폼"
          width={1200}
          height={300}
          priority
          className="w-auto h-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {algorithms.map((algo) => (
          <Link 
            href={`/algorithm/${algo.id}`} 
            key={algo.id}
            className="group p-8 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
          >
            <div className="flex flex-col gap-3">
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
