import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import SectionHeading from '@/components/common/SectionHeading'
import { useApi } from '@/hooks/useApi'
import { setAuthToken, setAuthUser } from '@/utils/authToken'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from || '/admin'
  const [state, setState] = useState({ email: '', password: '' })

  const { execute: runLogin, loading, error, data } = useApi(authApi.login)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await runLogin({
        email: state.email,
        password: state.password,
      })
      if (!result.token) {
        throw new Error('Login succeeded but token was not returned by API.')
      }
      setAuthToken(result.token)
      if (result.user) {
        setAuthUser(result.user)
      }
      navigate(redirectPath, { replace: true })
    } catch {
      // handled by useApi error state
    }
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Admin Access"
        title="Login connected with backend API."
        description="Credentials are sent to /auth/login and the returned token protects admin routes."
      />

      <section className="mt-10 flex justify-center">
        <form className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8" onSubmit={handleSubmit}>
          <label className="text-sm text-[var(--color-muted)]">Email</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            type="email"
            value={state.email}
            onChange={(event) => setState((prevState) => ({ ...prevState, email: event.target.value }))}
            placeholder="admin@dipcoder.dev"
            required
          />

          <label className="mt-4 block text-sm text-[var(--color-muted)]">Password</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            type="password"
            value={state.password}
            onChange={(event) => setState((prevState) => ({ ...prevState, password: event.target.value }))}
            placeholder="Enter password"
            required
          />

          <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {error ? <p className="mt-4 text-center text-sm text-red-400">{error}</p> : null}
          {data?.message ? <p className="mt-3 text-center text-sm text-emerald-400">{data.message}</p> : null}

          <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
            Need an account?{' '}
            <Link to="/signup" className="text-[var(--color-accent)]">
              Signup
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default Login
