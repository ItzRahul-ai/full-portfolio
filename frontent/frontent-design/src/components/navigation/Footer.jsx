import { Link } from 'react-router-dom'
import { NAV_LINKS, PERSONAL_INFO } from '@/utils/constants'

function Footer() {
  return (
    <footer className="content-layer px-4 pb-8 pt-16 md:px-8">
      <div className="glass-panel mx-auto max-w-7xl rounded-3xl px-6 py-8 md:px-10 md:py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <section>
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">Contact</p>
            <h3 className="section-title mt-2 text-2xl font-semibold text-[var(--color-text)]">{PERSONAL_INFO.name}</h3>
            <p className="mt-3 text-sm text-[var(--color-muted)]">{PERSONAL_INFO.tagline}</p>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">Connect</p>
            <div className="mt-3 space-y-2 text-sm">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="block text-[var(--color-text)] hover:text-[var(--color-accent)]">
                {PERSONAL_INFO.email}
              </a>
              <a href={`tel:${PERSONAL_INFO.phone}`} className="block text-[var(--color-text)] hover:text-[var(--color-accent)]">
                {PERSONAL_INFO.phone}
              </a>
              <a href={PERSONAL_INFO.facebook} target="_blank" rel="noreferrer" className="block text-[var(--color-text)] hover:text-[var(--color-accent)]">
                Facebook
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="block text-[var(--color-text)] hover:text-[var(--color-accent)]">
                Instagram
              </a>
            </div>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.26em] text-[var(--color-muted)]">Navigation</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className="btn-ghost px-3 py-2 text-xs">
                  {link.name}
                </Link>
              ))}
              <Link to="/admin" className="btn-ghost px-3 py-2 text-xs">
                Admin
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-8 border-t border-[var(--color-border)] pt-4 text-xs text-[var(--color-muted)]">
          <p>© {new Date().getFullYear()} Dip Coder. Engineered with React, Tailwind, Framer Motion, and Three.js.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
