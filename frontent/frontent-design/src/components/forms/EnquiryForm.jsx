import { useState } from 'react'
import { usePortfolio } from '@/hooks/usePortfolio'
import { SERVICE_CATALOG } from '@/utils/constants'

const inputClassName =
  'w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]'

function EnquiryForm({ type = 'general', title = 'Send an Enquiry' }) {
  const { addEnquiry } = usePortfolio()
  const [submittedRef, setSubmittedRef] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: SERVICE_CATALOG[0].title,
    budget: '$5k - $10k',
    message: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)
    try {
      const enquiry = await addEnquiry({ type, ...formData })
      setSubmittedRef(enquiry.reference || enquiry.id)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: SERVICE_CATALOG[0].title,
        budget: '$5k - $10k',
        message: '',
      })
    } catch (error) {
      setErrorMessage(error.message || 'Unable to submit enquiry.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="glass-panel rounded-2xl p-6" onSubmit={handleSubmit}>
      <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-2 text-sm text-[var(--color-muted)]">This form is connected to backend enquiry APIs.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input className={inputClassName} name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
        <input className={inputClassName} type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" required />
        <input className={inputClassName} name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone number" required />
        <input className={inputClassName} name="company" value={formData.company} onChange={handleChange} placeholder="Company / brand" />

        <select className={inputClassName} name="service" value={formData.service} onChange={handleChange}>
          {SERVICE_CATALOG.map((service) => (
            <option key={service.id} value={service.title}>
              {service.title}
            </option>
          ))}
        </select>

        <select className={inputClassName} name="budget" value={formData.budget} onChange={handleChange}>
          <option>$2k - $5k</option>
          <option>$5k - $10k</option>
          <option>$10k - $25k</option>
          <option>$25k+</option>
        </select>
      </div>

      <textarea
        className={`${inputClassName} mt-4 min-h-32 resize-y`}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Share project details"
        required
      />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
        </button>
        {submittedRef ? <p className="text-sm text-[var(--color-muted)]">Reference ID: {submittedRef}</p> : null}
      </div>
      {errorMessage ? <p className="mt-3 text-sm text-red-400">{errorMessage}</p> : null}
    </form>
  )
}

export default EnquiryForm
