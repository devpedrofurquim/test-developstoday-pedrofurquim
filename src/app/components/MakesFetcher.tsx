'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCar, FaCalendarAlt } from 'react-icons/fa';

interface Make {
  MakeId: number;
  MakeName: string;
}

export default function MakesFetcher() {
  const [makes, setMakes] = useState<Make[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState<number | null>(null);
  const [selectedMakeName, setSelectedMakeName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchMakes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/GetMakesForVehicleType/car?format=json`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!data.Results || !Array.isArray(data.Results)) {
          throw new Error('Unexpected API response format.');
        }

        setMakes(
          data.Results.map((make: any) => ({
            MakeId: make.MakeId,
            MakeName: make.MakeName,
          }))
        );
      } catch (err: any) {
        console.error('Error fetching makes:', err);
        setError(err.message || 'An unknown error occurred.');
      }
    };

    fetchMakes();
  }, []);

  /**
   * Generates an array of model years starting from a given year up to the current year.
   *
   * @param {number} startYear - The first model year to include.
   * @returns {number[]} - An array of years from `startYear` to the current year.
   */
  function getModelYears(startYear: number): number[] {
    const currentYear = new Date().getFullYear();

    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }

  const modelYears = getModelYears(2015);

  const isButtonDisabled = !selectedMakeId || !selectedYear;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl border-2 border-blue-400 w-full transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          <span className="text-blue-500">Find Cars Models</span> Easily
        </h1>

        {error ? (
          <p className="text-center text-red-500 font-semibold">{error}</p>
        ) : (
          <>
            {/* Vehicle Makes Dropdown */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCar className="inline-block mr-2 text-blue-500" />
                Select Vehicle Make
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedMakeId || ''}
                onChange={(e) => {
                  const selectedMake = makes.find(
                    (make) => make.MakeId === Number(e.target.value)
                  );
                  setSelectedMakeId(selectedMake ? selectedMake.MakeId : null);
                  setSelectedMakeName(
                    selectedMake ? selectedMake.MakeName : ''
                  );
                }}
              >
                <option value="">Select Make</option>
                {makes.map((make) => (
                  <option key={make.MakeId} value={make.MakeId}>
                    {make.MakeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Year Dropdown */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FaCalendarAlt className="inline-block mr-2 text-blue-500" />
                Select Model Year
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">Select Year</option>
                {modelYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Next Button */}
            <Link
              href={`/result/${selectedMakeId}/${selectedYear}?makeName=${encodeURIComponent(
                selectedMakeName
              )}`}
              className={`w-full block text-center font-semibold text-white p-3 rounded-lg mt-4 transition-all duration-300 ${
                isButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 transform hover:scale-105'
              }`}
              aria-disabled={isButtonDisabled}
              onClick={(e) => {
                if (isButtonDisabled) {
                  e.preventDefault();
                }
              }}
            >
              Next
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
