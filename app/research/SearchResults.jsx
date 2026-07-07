"use client";

import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";

export default function SearchResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const research = JSON.parse(
      sessionStorage.getItem("research") ?? '{"results":[]}'
    );
    setResults(research.results ?? []);
  }, []);

  useEffect(() => {
    function load() {
      const research = JSON.parse(
        sessionStorage.getItem("research") ?? '{"results":[]}'
      );
      setResults(research.results ?? []);
    }
    load();
    window.addEventListener("researchUpdated", load);
    return () => window.removeEventListener("researchUpdated", load);
  }, []);

  if (!results.length) return null;

  return (
    <div className="space-y-4">
      <div className="text-sm text-faint">
        <span>
          <strong>{results.length.toLocaleString()}</strong> result{results.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <ResultCard
            key={`${result.url}-${index}`}
            {...result}
          />
        ))}
      </div>
    </div>
  )
}
