import { useState } from 'react'
import EnquiryForm from '@/components/forms/EnquiryForm'
import SectionHeading from '@/components/common/SectionHeading'
import { usePortfolio } from '@/hooks/usePortfolio'

function ClientEnquiry() {
  const { getEnquiryByReference } = usePortfolio()
  const [reference, setReference] = useState('')
  const [matchedEnquiry, setMatchedEnquiry] = useState(null)
  const [searched, setSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')

  const handleSearch = async (event) => {
    event.preventDefault()
    setIsSearching(true)
    setSearchError('')
    try {
      const enquiry = await getEnquiryByReference(reference.trim())
      setMatchedEnquiry(enquiry)
      setSearched(true)
    } catch (error) {
      setSearchError(error.message || 'Unable to track enquiry right now.')
      setMatchedEnquiry(null)
      setSearched(true)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div>
      <SectionHeading
        eyebrow="Client Enquiry"
        title="Submit enquiry and track status."
        description="Use your reference ID to check progress updates from the admin dashboard."
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <EnquiryForm type="client" title="Client Enquiry Form" />

        <article className="glass-panel rounded-2xl p-6">
          <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Track Enquiry Status</h3>
          <p className="mt-2 text-sm text-[var(--color-muted)]">Reference ID example: ENQ-2401</p>

          <form className="mt-5 flex gap-3" onSubmit={handleSearch}>
            <input
              className="w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              placeholder="Enter reference ID"
              required
            />
            <button className="btn-primary" type="submit" disabled={isSearching}>
              {isSearching ? 'Tracking...' : 'Track'}
            </button>
          </form>
          {searchError ? <p className="mt-3 text-sm text-red-400">{searchError}</p> : null}

          {searched ? (
            matchedEnquiry ? (
              <div className="mt-5 rounded-xl border border-[var(--color-border)] p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Status</p>
                <p className="mt-2 text-lg font-semibold capitalize text-[var(--color-text)]">{matchedEnquiry.status}</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">Type: {matchedEnquiry.type}</p>
                <p className="text-sm text-[var(--color-muted)]">Submitted: {matchedEnquiry.createdAt}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-[var(--color-muted)]">No enquiry found with that reference.</p>
            )
          ) : null}
        </article>
      </section>
    </div>
  )
}

export default ClientEnquiry
