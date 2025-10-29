"use client";

import Header from "@/components/Header";
import ExperienceGrid from "@/components/ExperienceGrid";
import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    setQuery(text);
  };

  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      <Header text={text} setText={setText} onSearch={handleSearch} />
      <ExperienceGrid query={query} />
    </main>
  );
}
