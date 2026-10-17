import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
export const metadata = { title: "Create Account | Merkeb" };
export default function RegisterPage() {
  return (
    <main className="auth-page">
      <div className="auth-side">
        <p className="eyebrow">YOUR JOURNEY STARTS SMALL</p>
        <h2>
          You don't need
          <br />
          all the answers
          <br />
          <span>to begin.</span>
        </h2>
        <p>
          Start with curiosity. We'll help you turn it into a practical weekly
          plan.
        </p>
        <div className="auth-side-note">
          One step at a time. Your pace, your path.
        </div>
      </div>
      <Suspense
        fallback={<div className="loading-panel">Loading registration…</div>}>
        <AuthForm mode="register" />
      </Suspense>
    </main>
  );
}
