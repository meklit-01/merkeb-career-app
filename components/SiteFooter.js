export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/merkeb-sailboat.svg" alt="" />
          <span>Merkeb</span>
        </div>
        <p>Explore your options. Build your skills. Take your next step.</p>
        <small>
          Career information is educational guidance. Salary and outlook figures
          depend on source, country, role and experience.
        </small>
        <small className="demo-disclaimer">
          Demo project: accounts and progress are stored in this browser only.
        </small>
      </div>
    </footer>
  );
}
