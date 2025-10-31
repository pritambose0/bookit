"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import axios from "axios";
import { Experience } from "@/types/Experience";
import { Loader2 } from "lucide-react";

export default function ExperienceGrid({ query }: { query: string }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    async function fetchExperiences(pageNumber: number) {
      try {
        setLoading(true);
        const res = await axios.get(
          `/api/experiences/?page=${pageNumber}&query=${query}`
        );
        setExperiences(res.data.data);
        setPagination(res.data.pagination);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to fetch experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      setPage(1);
    }

    fetchExperiences(page);
  }, [page, query]);

  // console.log("Experience", experiences);
  // console.log("Pagination", pagination);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto h-[80vh] text-gray-500 flex justify-center items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto h-[80vh] text-gray-500 flex justify-center items-center gap-2">
        <p className="text-red-600 font-medium px-4 py-2 rounded-md">{error}</p>
      </div>
    );
  }

  const filteredExperiences = query
    ? experiences.filter((exp) =>
        exp.title.toLowerCase().includes(query.toLowerCase())
      )
    : experiences;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 pt-11 sm:pt-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 place-items-center relative z-0">
        {loading ? (
          <p className="text-gray-500 text-center col-span-full">Loading...</p>
        ) : filteredExperiences.length > 0 ? (
          filteredExperiences.map((exp, i) => (
            <ExperienceCard key={i} {...exp} />
          ))
        ) : (
          !filteredExperiences.length && (
            <div className="col-span-full flex justify-center items-center py-12">
              <p className="text-gray-600 text-base font-medium text-center">
                No experiences found matching your search.
              </p>
            </div>
          )
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6 pb-12">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={!pagination.hasPrevPage}
          className={`px-4 py-2 rounded-md text-sm font-medium transition bg-gray-100 ${
            pagination.hasPrevPage
              ? "hover:bg-gray-200 text-gray-800 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-600 text-sm">
          Page {page} of {pagination.totalPages}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!pagination.hasNextPage}
          className={`px-4 py-2 rounded-md text-sm font-medium transition bg-gray-100 ${
            pagination.hasNextPage
              ? "hover:bg-gray-200 text-gray-800 cursor-pointer"
              : "text-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
