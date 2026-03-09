import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <article className="glass-panel max-w-xl rounded-3xl p-10 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">404</p>
        <h1 className="section-title mt-3 text-4xl font-semibold text-[var(--color-text)]">Scene Not Found</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">The route you requested does not exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">
          Return Home
        </Link>
      </article>
    </div>
  )
}

export default NotFound
