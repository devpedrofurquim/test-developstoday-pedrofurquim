'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route

  return (
    <nav className="w-full mx-auto bg-white h-14 flex items-center justify-around">
      {/* Go Back Button */}
      {pathname !== '/' && (
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700 font-semibold transition-all duration-300"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
      )}

      {/* App Title */}
      <h1 className="text-lg font-bold text-gray-800">DevelopsToday</h1>
    </nav>
  );
}
