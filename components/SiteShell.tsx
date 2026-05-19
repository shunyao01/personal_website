import Link from "next/link";
import type { SiteConfig } from "@/lib/types";

export function SiteHeader({ site }: { site: SiteConfig }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="nav-logo" href="/#top">
          {site.logo}
          <span>_</span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav">
          Menu
        </button>
        <ul className="nav-links" id="mobile-nav">
          <li>
            <Link href="/#work">Work</Link>
          </li>
          <li>
            <Link href="/#experience">Experience</Link>
          </li>
          <li>
            <Link href="/#education">Education</Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
        </ul>
        <a className="nav-cta" href={site.social.email}>
          Get in touch
        </a>
      </nav>
    </header>
  );
}

export function ScrollIntent() {
  return (
    <aside className="scroll-intent" aria-label="Page position">
      <span className="intent-label">About</span>
      <span className="intent-track" aria-hidden="true">
        <span className="intent-progress"></span>
      </span>
      <span className="intent-count">
        <span className="intent-current">01</span>
        <span>/</span>
        <span>04</span>
      </span>
      <div className="intent-dots" aria-hidden="true">
        <span className="intent-dot is-active"></span>
        <span className="intent-dot"></span>
        <span className="intent-dot"></span>
        <span className="intent-dot"></span>
      </div>
    </aside>
  );
}

export function SiteFooter({ site }: { site: SiteConfig }) {
  return (
    <footer>
      <p className="ft">
        © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.firstName} {site.lastName}
      </p>
      <div className="ft-links">
        <a href={site.social.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={site.social.email}>Email</a>
      </div>
    </footer>
  );
}
