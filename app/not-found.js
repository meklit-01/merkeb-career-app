import Link from "next/link";
export default function NotFound() {
  return (
    <main className="standard-page">
      <div className="empty-state not-found">
        <p className="eyebrow">404 · NOT FOUND</p>
        <h1>That path isn't here.</h1>
        <p>The page may have moved, or the career guide may not exist.</p>
        <Link className="button button-dark" href="/careers">
          Back to career directory
        </Link>
      </div>
    </main>
  );
}
