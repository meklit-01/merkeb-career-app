"use client";
import Link from "next/link";
import { useApp } from "./AppProviders";
export default function SaveCareerButton({ careerId }) {
  const { user, progress, toggleSavedCareer, recordActivity } = useApp();
  const saved = progress.savedCareerIds.includes(careerId);
  function handleClick() {
    toggleSavedCareer(careerId);
    recordActivity(
      saved ? "Removed a career from shortlist" : "Saved a career to shortlist",
    );
  }
  if (!user)
    return (
      <Link
        className="button button-outline"
        href={`/login?next=${encodeURIComponent("/careers/" + careerId)}`}>
        Sign in to save this career
      </Link>
    );
  return (
    <button
      className={`button ${saved ? "button-lime" : "button-outline"}`}
      onClick={handleClick}>
      {saved ? "✓ Saved to my careers" : "+ Save this career"}
    </button>
  );
}
