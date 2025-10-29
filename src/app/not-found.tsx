"use client";

import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-28 bg-[#FAFAFA] text-center px-4">
      <div className="bg-white shadow-md rounded-full p-6 mb-6">
        <Frown className="w-10 h-10 text-gray-700" />
      </div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}
