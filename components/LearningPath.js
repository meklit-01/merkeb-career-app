"use client";
import { useApp } from "./AppProviders";
export default function LearningPath({ career }) {
  const { user, progress, toggleTopic } = useApp();
  const done = progress.completedTopics[career.id] || [];
  const total = (career.learningPath || []).reduce(
    (sum, level) => sum + level.topics.length,
    0,
  );
  return (
    <section className="learning-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A PRACTICAL ROADMAP</p>
          <h2>Build your skills in stages.</h2>
        </div>
        <span className="completion-chip">
          {done.length}/{total} topics done
        </span>
      </div>
      <div className="learning-levels">
        {(career.learningPath || []).map((level, index) => (
          <article className="learning-level" key={level.level}>
            <div className="level-heading">
              <span className="level-number">0{index + 1}</span>
              <div>
                <small>STAGE {index + 1}</small>
                <h3>{level.level}</h3>
              </div>
            </div>
            <div className="topic-list">
              {level.topics.map((topic) => (
                <label
                  className={`topic-row ${done.includes(topic) ? "topic-done" : ""}`}
                  key={topic}>
                  <input
                    type="checkbox"
                    checked={done.includes(topic)}
                    disabled={!user}
                    onChange={() => toggleTopic(career.id, topic)}
                  />
                  <span className="topic-check">✓</span>
                  <span>{topic}</span>
                </label>
              ))}
            </div>
            {!user && (
              <p className="demo-note">
                Sign in to save your learning progress.
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
