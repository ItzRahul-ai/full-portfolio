import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import SectionHeading from '@/components/common/SectionHeading'
import { useApi } from '@/hooks/useApi'
import { setAuthToken, setAuthUser } from '@/utils/authToken'

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { execute: runSignup, loading, error, data } = useApi(authApi.signup)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await runSignup(form)
      if (result.token) {
        setAuthToken(result.token)
        if (result.user) setAuthUser(result.user)
        navigate('/admin', { replace: true })
        return
      }
      navigate('/verify-otp', { state: { email: form.email } })
    } catch {
      // handled by useApi error state
    }
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Signup"
        title="Signup connected with backend API."
        description="Account creation uses /auth/signup and stores the returned session for admin access."
      />

      <section className="mt-10 flex justify-center">
        <form className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8" onSubmit={handleSubmit}>
          <label className="text-sm text-[var(--color-muted)]">Full Name</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            value={form.name}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, name: event.target.value }))}
            placeholder="Your full name"
            required
          />

          <label className="mt-4 block text-sm text-[var(--color-muted)]">Email</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, email: event.target.value }))}
            placeholder="you@example.com"
            required
          />

          <label className="mt-4 block text-sm text-[var(--color-muted)]">Password</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            type="password"
            value={form.password}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, password: event.target.value }))}
            placeholder="Create password"
            required
          />

          <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Signup'}
          </button>

          {error ? <p className="mt-4 text-center text-sm text-red-400">{error}</p> : null}
          {data?.message ? <p className="mt-3 text-center text-sm text-emerald-400">{data.message}</p> : null}

          <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
            Already registered?{' '}
            <Link to="/login" className="text-[var(--color-accent)]">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default Signup
