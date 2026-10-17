"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useApp } from "./AppProviders";
export default function AuthForm({ mode }) {
  const isRegister = mode === "register";
  const { login, register } = useApp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  function submit(event) {
    event.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Use a password with at least 6 characters for this demo.");
      return;
    }
    setBusy(true);
    const result = isRegister
      ? register({ name, email, password })
      : login({ email, password });
    setBusy(false);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push(searchParams.get("next") || "/dashboard");
  }
  return (
    <section className="auth-card">
      <p className="eyebrow">YOUR NEXT CHAPTER</p>
      <h1>{isRegister ? "Create your account." : "Welcome back."}</h1>
      <p className="auth-subtitle">
        {isRegister
          ? "Build a career plan that feels like yours."
          : "Pick up where your career journey left off."}
      </p>
      <form className="form-stack" onSubmit={submit}>
        {isRegister && (
          <label>
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </label>
        )}
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isRegister ? "At least 6 characters" : "Your password"}
            minLength={6}
            required
            autoComplete={isRegister ? "new-password" : "current-password"}
          />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="button button-dark button-full" disabled={busy}>
          {busy
            ? "Please wait…"
            : isRegister
              ? "Create my account ↗"
              : "Sign in ↗"}
        </button>
      </form>
      <p className="auth-switch">
        {isRegister ? "Already have an account?" : "New to Merkeb?"}{" "}
        <Link href={isRegister ? "/login" : "/register"}>
          {isRegister ? "Sign in" : "Create an account"}
        </Link>
      </p>
      <p className="demo-note">
        Simulation only: your account is saved in this browser. Do not use a
        real or reused password.
      </p>
    </section>
  );
}
