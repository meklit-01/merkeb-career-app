import CareerExplorer from "@/components/CareerExplorer";
import { careers, getCategories } from "@/lib/careers";
export const metadata = { title: "Explore Careers | Merkeb" };
export default function CareersPage() {
  return (
    <main className="standard-page">
      <div className="page-container">
        <div className="directory-hero">
          <p className="eyebrow">THE CAREER DIRECTORY</p>
          <h1>
            Curiosity is a<br />
            <span>good place</span> to start.
          </h1>
          <p className="page-intro">
            Explore different fields, compare skills and work styles, and find a
            path that fits your interests and goals.
          </p>
          <div className="directory-count">
            <strong>{careers.length.toString().padStart(2, "0")}</strong>
            <span>career guides to explore</span>
          </div>
        </div>
        <section className="directory-listing">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE THE OPTIONS</p>
              <h2>Find your kind of work.</h2>
            </div>
          </div>
          <CareerExplorer careers={careers} categories={getCategories()} />
        </section>
      </div>
    </main>
  );
}
