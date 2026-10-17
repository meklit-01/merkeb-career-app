"use client";
import { useApp } from "./AppProviders";
export default function WeeklyPlanner() {
  const { seedTasks, tasks, weekKey, toggleTask, progress, saveNotes } =
    useApp();
  const completed = tasks[weekKey] || [];
  const percent = Math.round((completed.length / seedTasks.length) * 100);
  return (
    <div className="planner-wrap">
      <section className="planner-hero">
        <p className="eyebrow">YOUR WEEK, WITH PURPOSE</p>
        <h1>Progress over perfection.</h1>
        <p>
          Choose small actions you can finish this week. Check them off as you
          go.
        </p>
        <div className="planner-progress">
          <div className="progress-track">
            <span style={{ width: `${percent}%` }} />
          </div>
          <strong>{percent}% complete</strong>
        </div>
      </section>
      <div className="planner-layout">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">WEEKLY CHECKLIST</p>
              <h2>Four steps to move forward</h2>
            </div>
            <span className="week-chip">{weekKey}</span>
          </div>
          <div className="task-list">
            {seedTasks.map((task) => (
              <label
                className={`task-row planner-task ${completed.includes(task.id) ? "task-done" : ""}`}
                key={task.id}>
                <input
                  type="checkbox"
                  checked={completed.includes(task.id)}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-check">✓</span>
                <span className="task-copy">
                  <span className="task-category">
                    {task.category} · {task.minutes} minutes
                  </span>
                  <strong>{task.title}</strong>
                  <small>{task.description}</small>
                </span>
              </label>
            ))}
          </div>
          <p className="demo-note">
            Your checklist is saved in this browser. A new ISO week gets its own
            checklist.
          </p>
        </section>
        <section className="panel reflection-panel">
          <p className="eyebrow">END-OF-WEEK REFLECTION</p>
          <h2>What did you discover?</h2>
          <p className="page-intro">
            A short reflection helps you notice your progress and choose a
            useful next step.
          </p>
          <label className="notes-label">
            Your notes
            <textarea
              defaultValue={progress.notes || ""}
              onBlur={(e) => saveNotes(e.target.value)}
              rows={8}
              placeholder="This week I learned…\nOne thing I found difficult…\nNext week I will…"
            />
          </label>
          <small className="muted-text">
            Your notes save when you leave the text box.
          </small>
        </section>
      </div>
    </div>
  );
}
