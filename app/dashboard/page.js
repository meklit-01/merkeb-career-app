import { RequireAuth } from "@/components/AppProviders";
import DashboardClient from "@/components/DashboardClient";
export const metadata = { title: "My Dashboard | Merkeb" };
export default function DashboardPage() {
  return (
    <main className="standard-page dashboard-page">
      <div className="page-container">
        <RequireAuth>
          <DashboardClient />
        </RequireAuth>
      </div>
    </main>
  );
}
