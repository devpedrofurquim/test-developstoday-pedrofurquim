'use client';

import { use } from 'react';
import { Suspense } from 'react';
import ModelsFetcher from '../../../components/ModelsFetcher';

export default function ResultsPage({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = use(params); // ✅ Unwrap params using `use()`

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Suspense fallback={<LoadingComponent />}>
        <ModelsFetcher makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}

// ✅ Loading fallback component
function LoadingComponent() {
  return (
    <div className="text-center text-gray-500">
      <p>Loading models...</p>
    </div>
  );
}
