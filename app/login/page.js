import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Sign In | Merkeb" };
export default function LoginPage() {
  return (
    <main className="auth-page">
      <div className="auth-side">
        <p className="eyebrow">WELCOME TO YOUR NEXT CHAPTER</p>
        <h2>
          Build a future
          <br />
          that feels <span>like you.</span>
        </h2>
        <p>
          Explore your options, choose your next step, and keep your progress in
          one place.
        </p>
        <div className="auth-side-note">
          01 / Explore · 02 / Learn · 03 / Grow
        </div>
      </div>
      <Suspense
        fallback={<div className="loading-panel">Loading sign in…</div>}>
        <AuthForm mode="login" />
      </Suspense>
    </main>
  );
}
