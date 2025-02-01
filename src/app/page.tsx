'use client';

import { Suspense } from 'react';
import MakesFetcher from './components/MakesFetcher';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* ✅ Suspense will show loading UI while fetching makes */}
      <Suspense fallback={<LoadingComponent />}>
        <MakesFetcher />
      </Suspense>
    </div>
  );
}

// ✅ Fallback UI for loading state
function LoadingComponent() {
  return (
    <div className="text-center text-gray-500">
      <p>Loading vehicle makes...</p>
    </div>
  );
}
