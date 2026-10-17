"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useApp } from "./AppProviders";
import { careers } from "@/lib/careers";
export default function DashboardClient() {
  const { user, progress, tasks, weekKey, seedTasks, toggleTask, saveNotes } =
    useApp();
  const saved = careers.filter((career) =>
    progress.savedCareerIds.includes(career.id),
  );
  const topicsDone = Object.values(progress.completedTopics || {}).reduce(
    (sum, list) => sum + list.length,
    0,
  );
  const topicsTotal = saved.reduce(
    (sum, career) =>
      sum +
      (career.learningPath || []).reduce(
        (a, level) => a + level.topics.length,
        0,
      ),
    0,
  );
  const completed = tasks[weekKey] || [];
  const recent = progress.activity || [];
  const completion = Math.round((completed.length / seedTasks.length) * 100);
  const notes = progress.notes || "";
  const activityByDay = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const count = recent.filter(
        (item) => new Date(item.at).toDateString() === date.toDateString(),
      ).length;
      days.push({
        label: date.toLocaleDateString("en", { weekday: "short" }),
        count,
      });
    }
    return days;
  }, [recent]);
  return (
    <div className="dashboard-content">
      <section className="dashboard-welcome">
        <div>
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h1>Keep moving, {user?.name?.split(" ")[0] || "there"}.</h1>
          <p>Your progress is built one small, consistent step at a time.</p>
        </div>
        <Link className="button button-dark" href="/careers">
          Explore careers ↗
        </Link>
      </section>
      <div className="stats-grid">
        <article className="stat-card">
          <span className="stat-icon">✳</span>
          <p>Saved careers</p>
          <strong>{saved.length.toString().padStart(2, "0")}</strong>
          <small>Paths you want to explore</small>
        </article>
        <article className="stat-card">
          <span className="stat-icon">✓</span>
          <p>Learning topics done</p>
          <strong>{topicsDone.toString().padStart(2, "0")}</strong>
          <small>
            {topicsTotal
              ? `Across ${saved.length} saved career${saved.length === 1 ? "" : "s"}`
              : "Save a career to start tracking"}
          </small>
        </article>
        <article className="stat-card">
          <span className="stat-icon">↗</span>
          <p>This week's tasks</p>
          <strong>
            {completed.length}/{seedTasks.length}
          </strong>
          <small>{completion}% weekly checklist complete</small>
        </article>
      </div>
      <div className="dashboard-columns">
        <section className="panel weekly-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">WEEKLY FOCUS</p>
              <h2>Your small steps add up.</h2>
            </div>
            <span className="week-chip">{weekKey}</span>
          </div>
          <div className="progress-track">
            <span style={{ width: `${completion}%` }} />
          </div>
          <p className="progress-caption">
            {completed.length} of {seedTasks.length} tasks completed
          </p>
          <div className="task-list">
            {seedTasks.map((task) => (
              <label
                className={`task-row ${completed.includes(task.id) ? "task-done" : ""}`}
                key={task.id}>
                <input
                  type="checkbox"
                  checked={completed.includes(task.id)}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-check">✓</span>
                <span className="task-copy">
                  <strong>{task.title}</strong>
                  <small>{task.description}</small>
                </span>
                <span className="task-minutes">{task.minutes} min</span>
              </label>
            ))}
          </div>
          <Link className="text-link" href="/tasks">
            Open weekly planner <span>→</span>
          </Link>
        </section>
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">CONSISTENCY TRACKER</p>
              <h2>Your last 7 days</h2>
            </div>
          </div>
          <div className="activity-bars">
            {activityByDay.map((day) => (
              <div className="activity-day" key={day.label}>
                <div className="bar-area">
                  <span
                    className={day.count ? "bar-active" : ""}
                    style={{
                      height: `${day.count ? Math.min(100, 25 + day.count * 25) : 8}%`,
                    }}
                    title={`${day.count} recorded activities`}
                  />
                </div>
                <small>{day.label}</small>
              </div>
            ))}
          </div>
          <p className="demo-note">
            Bars reflect actions recorded in this browser, not measured time or
            verified learning.
          </p>
          <label className="notes-label">
            Weekly reflection
            <textarea
              defaultValue={notes}
              onBlur={(e) => saveNotes(e.target.value)}
              placeholder="What did you learn? What will you try next week?"
              rows={4}
            />
          </label>
          <small className="muted-text">
            Notes save when you leave this field.
          </small>
        </section>
      </div>
      <section className="saved-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR SHORTLIST</p>
            <h2>Career paths you saved</h2>
          </div>
          <Link className="text-link" href="/careers">
            Browse all <span>→</span>
          </Link>
        </div>
        {saved.length ? (
          <div className="saved-career-list">
            {saved.map((career) => (
              <Link
                className="saved-career-row"
                href={`/careers/${career.id}`}
                key={career.id}>
                <span className="saved-symbol">✳</span>
                <span>
                  <strong>{career.title}</strong>
                  <small>
                    {career.category} · {career.entryDifficulty} entry path
                  </small>
                </span>
                <span className="row-arrow">↗</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Your shortlist starts here</h3>
            <p>
              Save careers that interest you and track the learning steps that
              follow.
            </p>
            <Link className="button button-outline" href="/careers">
              Explore career paths
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
