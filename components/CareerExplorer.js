"use client";
import { useMemo, useState } from "react";
import CareerCard from "./CareerCard";
export default function CareerExplorer({ careers, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All careers");
  const [workMode, setWorkMode] = useState("All work modes");
  const filtered = useMemo(
    () =>
      careers.filter((career) => {
        const text =
          `${career.title} ${career.category} ${career.summary} ${(career.skills?.technical || []).join(" ")}`.toLowerCase();
        return (
          text.includes(query.toLowerCase()) &&
          (category === "All careers" || career.category === category) &&
          (workMode === "All work modes" ||
            (career.workModes || []).includes(workMode))
        );
      }),
    [careers, query, category, workMode],
  );
  return (
    <>
      <div className="explorer-controls">
        <label className="search-box">
          <span>⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search careers, skills, or interests…"
            aria-label="Search careers"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category">
          <option>All careers</option>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select
          value={workMode}
          onChange={(e) => setWorkMode(e.target.value)}
          aria-label="Filter by work mode">
          <option>All work modes</option>
          {["On-site", "Hybrid", "Remote", "Freelance"].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <p className="results-count">
        Showing {filtered.length} of {careers.length} career paths
      </p>
      {filtered.length ? (
        <div className="career-grid">
          {filtered.map((career) => (
            <CareerCard key={career.id} career={career} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No career matches yet</h3>
          <p>Try another search or remove a filter.</p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setCategory("All careers");
              setWorkMode("All work modes");
            }}>
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
