import { notFound } from "next/navigation";
import Link from "next/link";
import { careers, getCareer } from "@/lib/careers";
import SaveCareerButton from "@/components/SaveCareerButton";
import LearningPath from "@/components/LearningPath";
export function generateStaticParams() {
  return careers.map((career) => ({ id: career.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  const career = getCareer(id);
  return { title: career ? `${career.title} | Merkeb` : "Career not found" };
}
export default async function CareerDetailPage({ params }) {
  const { id } = await params;
  const career = getCareer(id);
  if (!career) notFound();
  const skills = career.skills || {};
  const ethiopia = career.industryInsights?.ethiopia;
  const international = career.industryInsights?.international;
  return (
    <main className="standard-page career-detail-page">
      <div className="detail-wrap">
        <Link className="back-link" href="/careers">
          ← Back to career directory
        </Link>
        <section className="career-detail-hero">
          <div className="career-detail-art">
            <span className="art-kicker">{career.category}</span>
            <span className="detail-art-symbol">✳</span>
            <span className="detail-art-title">{career.title}</span>
            <span className="art-footer-note">A CAREER GUIDE · MERKEB</span>
          </div>
          <div className="career-detail-copy">
            <p className="eyebrow">CAREER FIELD GUIDE</p>
            <h1>
              {career.title}
              <span>.</span>
            </h1>
            <p className="detail-description">{career.summary}</p>
            <div className="detail-badges">
              <span>{career.entryDifficulty} entry path</span>
              {(career.workModes || []).map((mode) => (
                <span key={mode}>{mode}</span>
              ))}
            </div>
            <p className="detail-meta">
              <strong>Education to consider</strong>
              <br />
              {career.education}
            </p>
            <SaveCareerButton careerId={career.id} />
          </div>
        </section>
        <section className="career-overview">
          <div className="overview-copy">
            <p className="eyebrow">WHAT THE WORK LOOKS LIKE</p>
            <h2>Turn your interests into useful skills.</h2>
            <p>
              {career.summary} The exact day-to-day work can differ by
              organization, seniority, and industry, so use this guide as a
              starting point for further research.
            </p>
            <h3>Common job titles</h3>
            <div className="skill-pills larger-pills">
              {(career.commonRoles || []).map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </div>
          <div className="skill-stack">
            <article>
              <span>01</span>
              <h3>Technical skills</h3>
              <ul>
                {(skills.technical || []).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
            <article>
              <span>02</span>
              <h3>Tools to know</h3>
              <ul>
                {(skills.tools || []).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
            <article>
              <span>03</span>
              <h3>People skills</h3>
              <ul>
                {(skills.soft || []).map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
        <LearningPath career={career} />
        <section className="courses-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COURSE SUGGESTIONS</p>
              <h2>Learn with a little direction.</h2>
              <p className="section-intro">
                Explore these learning resources to start building the skills
                for this career. Check each provider for current availability,
                fees, and prerequisites.
              </p>
            </div>
          </div>
          {(career.recommendedCourses || []).length ? (
            <div className="course-grid">
              {career.recommendedCourses.map((course) => (
                <article
                  className="course-card"
                  key={`${course.name}-${course.provider}`}>
                  <div className="course-card-top">
                    <span className="course-mark">↗</span>
                    <span className="course-type">
                      {course.type || "Learning resource"}
                    </span>
                  </div>
                  <h3>{course.name}</h3>
                  <p className="course-provider">{course.provider}</p>
                  <a
                    className="course-link"
                    href={course.url}
                    target="_blank"
                    rel="noreferrer">
                    Explore course <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <div className="course-empty">
              <h3>No specific course list yet</h3>
              <p>
                Use the skills and learning roadmap above to search for
                reputable courses from universities and training providers.
              </p>
            </div>
          )}
        </section>
        <section className="insights-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">INDUSTRY INSIGHTS</p>
              <h2>Look at the wider picture.</h2>
            </div>
          </div>
          <div className="insight-grid">
            <article className="insight-card">
              <p className="eyebrow">ETHIOPIA</p>
              <h3>Local context</h3>
              <p>
                {ethiopia?.trend ||
                  "Research current Ethiopian vacancies and talk to professionals in this field."}
              </p>
              {ethiopia?.salary && (
                <div className="insight-data">
                  <strong>
                    {ethiopia.salary.median
                      ? `${ethiopia.salary.currency} ${ethiopia.salary.median.toLocaleString()}`
                      : `${ethiopia.salary.currency} salary guidance`}
                  </strong>
                  <small>
                    {ethiopia.salary.period}
                    {ethiopia.salary.note ? ` · ${ethiopia.salary.note}` : ""}
                  </small>
                </div>
              )}
              <small>
                {ethiopia?.source ||
                  "Verify against current job advertisements."}
              </small>
            </article>
            <article className="insight-card insight-international">
              <p className="eyebrow">INTERNATIONAL REFERENCE</p>
              <h3>{international?.referenceCountry || "Global options"}</h3>
              <p>
                {international?.trend ||
                  "Requirements and compensation vary by country, company, and experience."}
              </p>
              {international?.salary && (
                <div className="insight-data">
                  <strong>
                    {international.salary.median
                      ? `${international.salary.currency} ${international.salary.median.toLocaleString()}`
                      : "Check current salary data"}
                  </strong>
                  <small>
                    {international.salary.period}
                    {international.salary.source
                      ? ` · ${international.salary.source}`
                      : ""}
                  </small>
                </div>
              )}
              {international?.growthProjection?.percent !== undefined && (
                <p className="growth-note">
                  Projection: {international.growthProjection.percent}% (
                  {international.growthProjection.period})
                </p>
              )}
              <small>
                Use the linked source notes in the data as a starting point;
                verify current figures before making decisions.
              </small>
            </article>
          </div>
        </section>
        <section className="questions-section">
          <p className="eyebrow">QUESTIONS PEOPLE ASK</p>
          <h2>Good things to ask before you begin.</h2>
          <div className="question-grid">
            {(career.commonQuestions || []).map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
          <div className="detail-bottom-cta">
            <div>
              <h2>Want to make this your path?</h2>
              <p>
                Save this career and track your learning topics in your personal
                workspace.
              </p>
            </div>
            <SaveCareerButton careerId={career.id} />
          </div>
        </section>
      </div>
    </main>
  );
}
