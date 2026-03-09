import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '@/api/authApi'
import SectionHeading from '@/components/common/SectionHeading'
import { useApi } from '@/hooks/useApi'
import { setAuthToken, setAuthUser } from '@/utils/authToken'

function OtpVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({
    email: location.state?.email || '',
    otp: '',
  })

  const { execute: runVerifyOtp, loading, error, data } = useApi(authApi.verifyOtp)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const result = await runVerifyOtp(form)
      if (result.token) {
        setAuthToken(result.token)
        if (result.user) setAuthUser(result.user)
        navigate('/admin', { replace: true })
        return
      }
      navigate('/login', { replace: true })
    } catch {
      // handled by useApi error state
    }
  }

  return (
    <div>
      <SectionHeading
        eyebrow="OTP Verification"
        title="Verify account using OTP API."
        description="Enter the OTP sent to your email. This form calls POST /auth/otp."
      />

      <section className="mt-10 flex justify-center">
        <form className="glass-panel w-full max-w-xl rounded-3xl p-6 md:p-8" onSubmit={handleSubmit}>
          <label className="text-sm text-[var(--color-muted)]">Email</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            type="email"
            value={form.email}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, email: event.target.value }))}
            required
          />

          <label className="mt-4 block text-sm text-[var(--color-muted)]">OTP</label>
          <input
            className="mt-2 w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            value={form.otp}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, otp: event.target.value }))}
            placeholder="Enter OTP"
            required
          />

          <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
            {loading ? 'Verifying OTP...' : 'Verify OTP'}
          </button>

          {error ? <p className="mt-4 text-center text-sm text-red-400">{error}</p> : null}
          {data?.message ? <p className="mt-3 text-center text-sm text-emerald-400">{data.message}</p> : null}

          <p className="mt-4 text-center text-sm text-[var(--color-muted)]">
            Back to{' '}
            <Link to="/login" className="text-[var(--color-accent)]">
              Login
            </Link>
          </p>
        </form>
      </section>
    </div>
  )
}

export default OtpVerification
