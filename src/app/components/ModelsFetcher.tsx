'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaCar,
  FaRedoAlt,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

interface Model {
  Make_ID: number;
  Make_Name: string;
  Model_ID: string;
  Model_Name: string;
}

export default function ModelsFetcher({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  const searchParams = useSearchParams();
  const makeName = searchParams.get('makeName') || 'Unknown Make';

  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retry, setRetry] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const modelsPerPage = 6; // ✅ Show 6 models per page

  useEffect(() => {
    console.log(models);
  }, [models]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!makeId || isNaN(Number(makeId))) {
        throw new Error(`Invalid Make ID: ${makeId}`);
      }

      const response = await fetch(
        `${API_BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.Results || !Array.isArray(data.Results)) {
        throw new Error('Unexpected API response format.');
      }

      if (data.Results.length > 0) {
        const uniqueModels: Model[] = [];
        const modelIds = new Set<string>();

        data.Results.forEach((result: Model) => {
          if (result.Model_ID && !modelIds.has(result.Model_ID)) {
            modelIds.add(result.Model_ID);
            uniqueModels.push(result);
          }
        });

        setModels(uniqueModels);
      } else {
        setModels([]);
        setError(
          `No models found for ${decodeURIComponent(makeName)} in ${year}`
        );
      }
    } catch (err: unknown) {
      console.error('Error fetching models:', err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  useEffect(() => {
    fetchModels();
  }, [makeId, year, retry]);

  // ✅ Pagination Logic
  const indexOfLastModel = currentPage * modelsPerPage;
  const indexOfFirstModel = indexOfLastModel - modelsPerPage;
  const currentModels = models.slice(indexOfFirstModel, indexOfLastModel);
  const totalPages = Math.ceil(models.length / modelsPerPage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transition-all duration-300 hover:shadow-2xl border border-gray-200">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Models for{' '}
          <span className="text-blue-500">{decodeURIComponent(makeName)}</span>{' '}
          ({year})
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 animate-pulse">
            Loading models...
          </p>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 font-semibold">{error}</p>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center space-x-2"
              onClick={() => setRetry(!retry)}
            >
              <FaRedoAlt className="text-white" />
              <span>Retry</span>
            </button>
          </div>
        ) : currentModels.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {currentModels.map((model) => (
                <div
                  key={model.Model_ID}
                  className="bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition-all duration-300 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-x-2 sm:space-y-0 text-center"
                >
                  <FaCar className="text-blue-500" />
                  <p className="text-md font-medium">{model.Model_Name}</p>
                </div>
              ))}
            </div>

            {/* ✅ Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4 mt-6">
                {/* Previous Page Button */}
                <button
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${
                    currentPage === 1
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <FaChevronLeft />
                </button>

                <span className="text-md font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next Page Button */}
                <button
                  className={`px-4 py-2 rounded-lg text-white font-semibold transition-all ${
                    currentPage === totalPages
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">
            No models available for this selection.
          </p>
        )}
      </div>
    </div>
  );
}
