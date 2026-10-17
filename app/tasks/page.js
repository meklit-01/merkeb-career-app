import { RequireAuth } from "@/components/AppProviders";
import WeeklyPlanner from "@/components/WeeklyPlanner";
export const metadata = { title: "Weekly Planner | Merkeb" };
export default function TasksPage() {
  return (
    <main className="standard-page dashboard-page">
      <div className="page-container">
        <RequireAuth>
          <WeeklyPlanner />
        </RequireAuth>
      </div>
    </main>
  );
}
