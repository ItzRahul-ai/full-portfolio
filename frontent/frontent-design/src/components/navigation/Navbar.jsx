import { useEffect, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '@/utils/constants'
import { useTheme } from '@/hooks/useTheme'
import ThemeModeToggle from '@/components/common/ThemeModeToggle'
import logoImage from '@/assets/logo.jpeg'

function linkClassName({ isActive }) {
  return `rounded-full px-4 py-2 text-sm transition ${
    isActive
      ? 'bg-[color-mix(in_srgb,var(--color-accent)_24%,transparent)] text-[var(--color-text)]'
      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
  }`
}

function HamburgerButton({ open, onClick }) {
  return (
    <button
      className="btn-ghost relative h-10 w-10 p-0 lg:hidden"
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
    >
      <span
        className={`absolute left-1/2 top-[34%] h-[2px] w-5 -translate-x-1/2 rounded-full bg-[var(--color-text)] transition ${
          open ? 'translate-y-[4px] rotate-45' : ''
        }`}
      />
      <span
        className={`absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-text)] transition ${
          open ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`absolute left-1/2 top-[66%] h-[2px] w-5 -translate-x-1/2 rounded-full bg-[var(--color-text)] transition ${
          open ? '-translate-y-[4px] -rotate-45' : ''
        }`}
      />
    </button>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { mode, toggleMode } = useTheme()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="content-layer sticky top-0 z-50 px-4 pt-4 md:px-8">
        <nav className="glass-panel mx-auto max-w-7xl rounded-2xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
              <img src={logoImage} alt="Dip Coder logo" className="h-10 w-10 rounded-xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Portfolio</p>
                <p className="section-title text-base font-semibold text-[var(--color-text)]">Dip Coder</p>
              </div>
            </Link>

            <div className="hidden items-center gap-2 lg:flex">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClassName}>
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <ThemeModeToggle mode={mode} onToggle={toggleMode} />
              <Link to="/login" className="btn-ghost text-sm">
                Login
              </Link>
              <Link to="/signup" className="btn-primary text-sm">
                Signup
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeModeToggle mode={mode} onToggle={toggleMode} className="px-2" />
              <HamburgerButton open={menuOpen} onClick={() => setMenuOpen((prevOpen) => !prevOpen)} />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <Motion.button
              className="fixed inset-0 z-[59] bg-black/45 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close mobile menu backdrop"
            />

            <Motion.aside
              className="fixed right-0 top-0 z-[60] h-screen w-[84%] max-w-sm border-l border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_90%,black_10%)] p-6 backdrop-blur-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between">
                <p className="section-title text-lg font-semibold text-[var(--color-text)]">Menu</p>
                <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(false)} />
              </div>

              <div className="mt-6 space-y-2">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="block rounded-xl border border-[var(--color-border)] px-4 py-3 text-sm text-[var(--color-text)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Link to="/login" className="btn-ghost text-sm" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm" onClick={() => setMenuOpen(false)}>
                  Signup
                </Link>
              </div>
            </Motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar
