import { use } from 'react';
import { Suspense } from 'react';
import ModelsFetcher from '../../../components/ModelsFetcher';
import { Make } from '@/app/components/MakesFetcher';

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

// ✅ Enable Static Generation with Dynamic Routes
export async function generateStaticParams() {
  const res = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
  );
  const data = await res.json();

  const makes = data.Results.map((make: Make) => make.MakeName);

  const currentYear = new Date().getFullYear();
  const modelYears = Array.from({ length: currentYear - 2014 }, (_, i) =>
    (2015 + i).toString()
  );

  // Generate static paths
  const paths = makes.flatMap((make: string) =>
    modelYears.map((year: string) => ({
      makeId: encodeURIComponent(make),
      year,
    }))
  );

  return paths;
}
