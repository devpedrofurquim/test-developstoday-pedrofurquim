import { Make } from '@/app/components/MakesFetcher';

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
