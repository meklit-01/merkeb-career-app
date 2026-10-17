import Link from "next/link";
import CareerCard from "@/components/CareerCard";
import { careers } from "@/lib/careers";
export default function HomePage() {
  const featured = careers.slice(0, 3);
  return (
    <main>
      <section className="hero home-hero">
        <div className="hero-inner">
          <p className="eyebrow">CAREER CLARITY STARTS HERE</p>
          <h1>
            Your future isn't
            <br />
            one-size-<span>fits-all.</span>
          </h1>
          <p className="hero-description">
            Explore careers, discover the skills behind them, and turn curiosity
            into a plan you can actually follow.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/careers">
              Explore career paths ↗
            </Link>
            <Link className="button button-outline" href="/register">
              Build my plan
            </Link>
          </div>
          <div className="hero-proof">
            <span className="proof-mark">✓</span>
            <span>Practical guidance for your next step</span>
            <span className="proof-dot">·</span>
            <span>Built for Ethiopia and global options</span>
          </div>
        </div>
        <div className="hero-art career-hero-art">
          <div className="hero-circle circle-one" />
          <div className="hero-circle circle-two" />
          <div className="compass-disc">
            <img
              className="compass-hero-image"
              src="/images/compass-rose.svg"
              alt="Compass rose representing career direction"
            />
          </div>
          <span className="orbit-label orbit-one">Explore</span>
          <span className="orbit-label orbit-two">Learn</span>
          <span className="orbit-label orbit-three">Grow</span>
        </div>
      </section>
      <section className="value-strip">
        <div>
          <span>01</span>
          <strong>Explore</strong>
          <small>Compare career paths</small>
        </div>
        <div>
          <span>02</span>
          <strong>Understand</strong>
          <small>See skills and learning steps</small>
        </div>
        <div>
          <span>03</span>
          <strong>Take action</strong>
          <small>Track your weekly progress</small>
        </div>
      </section>
      <section className="menu-section home-featured">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR DIRECTION</p>
            <h2>Career paths worth exploring.</h2>
          </div>
          <Link className="text-link" href="/careers">
            View all career paths <span>→</span>
          </Link>
        </div>
        <div className="career-grid">
          {featured.map((career) => (
            <CareerCard career={career} key={career.id} />
          ))}
        </div>
      </section>
      <section className="plan-banner">
        <div>
          <p className="eyebrow">MAKE YOUR NEXT STEP COUNT</p>
          <h2>
            A little progress,
            <br />
            every single week.
          </h2>
          <p>
            Save careers, follow a learning roadmap, and use your personal
            dashboard to keep track of the work you put in.
          </p>
          <Link className="button button-dark" href="/register">
            Start my career plan ↗
          </Link>
        </div>
        <div className="banner-card">
          <span className="banner-card-label">YOUR WEEKLY MOMENTUM</span>
          <div className="banner-big-number">
            04<span> steps</span>
          </div>
          <div className="mini-task">
            <span>✓</span> Explore a career
          </div>
          <div className="mini-task">
            <span>✓</span> Learn a new topic
          </div>
          <div className="mini-task">
            <i /> Practice a skill
          </div>
          <div className="mini-task">
            <i /> Reflect on progress
          </div>
          <small>Small steps count.</small>
        </div>
      </section>
    </main>
  );
}
