import Link from "next/link";
const icons = {
  Technology: "⌘",
  "Information Technology": "⌁",
  "Data & Analytics": "▥",
  Finance: "↗",
  "Design & Technology": "✳",
  Business: "◈",
};
export default function CareerCard({ career }) {
  return (
    <article className="career-card">
      <Link className="career-art" href={`/careers/${career.id}`}>
        <span className="art-kicker">{career.category}</span>
        <span className="art-icon">{icons[career.category] || "✳"}</span>
        <span className="art-title">{career.title}</span>
        <span className="art-open">↗</span>
      </Link>
      <div className="career-card-body">
        <div className="card-meta">
          <span>{career.entryDifficulty} entry path</span>
          <span>
            {career.workModes?.includes("Remote")
              ? "Remote options"
              : career.workModes?.[0] || "Flexible"}
          </span>
        </div>
        <p>{career.summary}</p>
        <div className="skill-pills">
          {(career.skills?.technical || []).slice(0, 3).map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
        <Link className="text-link" href={`/careers/${career.id}`}>
          Explore career <span>→</span>
        </Link>
      </div>
    </article>
  );
}
