"use client";
import Link from "next/link";
import { useApp } from "./AppProviders";
import ThemeToggle from "./ThemeToggle";
export default function SiteHeader() {
  const { user, logout } = useApp();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <img src="/images/merkeb-sailboat.svg" alt="" />
          </span>
          <span className="brand-name">
            Merkeb <small>CAREER EXPLORER</small>
          </span>
        </Link>
        <nav className="main-nav">
          <Link href="/careers">Explore careers</Link>
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button className="nav-button" onClick={logout}>
                Log out
              </button>
              <Link className="nav-user" href="/dashboard">
                {user.name.split(" ")[0]}
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">Sign in</Link>
              <Link className="button button-dark nav-cta" href="/register">
                Get started
              </Link>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}