"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
import axios from "axios";
import { Experience } from "@/types/Experience";

export default function ExperienceGrid({ query }: { query: string }) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await axios.get("/api/experiences");
        setExperiences(res.data.data);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to fetch experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchExperiences();
  }, []);

  // console.log("Experience", experiences);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 place-items-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg w-[280px] h-[312px] animate-pulse"
          >
            <div className="h-[170px] bg-gray-300 w-full rounded-t-md" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-5/6" />
              <div className="flex justify-between items-center mt-3">
                <div className="h-4 bg-gray-300 rounded w-1/3" />
                <div className="h-6 bg-gray-300 rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center pb-12">
        <p className="text-red-600 font-medium bg-red-50 border border-red-200 px-4 py-2 rounded-md">
          {error}
        </p>
      </div>
    );
  }

  const filteredExperiences = query
    ? experiences.filter((exp) =>
        exp.title.toLowerCase().includes(query.toLowerCase())
      )
    : experiences;

  return (
    <div className="relative z-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 place-items-center">
      {filteredExperiences.length > 0 ? (
        filteredExperiences.map((exp, i) => <ExperienceCard key={i} {...exp} />)
      ) : (
        <div className="col-span-full flex justify-center items-center py-12">
          <p className="text-gray-600 text-base font-medium text-center">
            No experiences found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
