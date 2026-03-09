import { useState } from 'react'
import ScrollReveal from '@/components/common/ScrollReveal'
import SectionHeading from '@/components/common/SectionHeading'
import { TESTIMONIALS } from '@/utils/constants'

const initialReviews = [
  {
    id: 'review-1',
    client: 'Ritwick Das',
    role: 'Startup Founder',
    quote: 'Great design taste and very smooth frontend execution.',
    rating: 5,
    isUserReview: true,
  },
]

function RatingStars({ value }) {
  return (
    <div className="mt-4 flex gap-1 text-base">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={`star-${index}`} className={index < value ? 'text-[var(--color-accent)]' : 'text-[var(--color-border)]'}>
          *
        </span>
      ))}
    </div>
  )
}

function TestimonialsSection() {
  const [reviews, setReviews] = useState(initialReviews)
  const [form, setForm] = useState({
    name: '',
    role: '',
    rating: '5',
    review: '',
  })

  const allTestimonials = [...TESTIMONIALS, ...reviews]

  const handleSubmit = (event) => {
    event.preventDefault()
    setReviews((prevReviews) => [
      {
        id: `review-${Date.now()}`,
        client: form.name,
        role: form.role || 'Website Visitor',
        quote: form.review,
        rating: Number(form.rating),
        isUserReview: true,
      },
      ...prevReviews,
    ])
    setForm({ name: '', role: '', rating: '5', review: '' })
  }

  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by teams and reviewed by users."
        description="Visitors can also submit quick feedback directly on the homepage."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {allTestimonials.map((item, index) => (
          <ScrollReveal key={item.id} delay={index * 0.05}>
            <article className="glass-panel rounded-2xl p-6">
              <p className="text-sm leading-relaxed text-[var(--color-text)]">"{item.quote}"</p>
              {item.rating ? <RatingStars value={item.rating} /> : null}
              <div className="mt-6 border-t border-[var(--color-border)] pt-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium text-[var(--color-text)]">{item.client}</p>
                  {item.isUserReview ? (
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                      User Review
                    </span>
                  ) : null}
                </div>
                <p className="text-sm text-[var(--color-muted)]">{item.role}</p>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <form className="glass-panel mt-8 rounded-2xl p-6" onSubmit={handleSubmit}>
        <h3 className="section-title text-2xl font-semibold text-[var(--color-text)]">Write a Review</h3>
        <p className="mt-2 text-sm text-[var(--color-muted)]">Share your experience as a visitor or client.</p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input
            className="w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            placeholder="Your name"
            value={form.name}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, name: event.target.value }))}
            required
          />
          <input
            className="w-full rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            placeholder="Role / Company"
            value={form.role}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, role: event.target.value }))}
          />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-[150px_1fr]">
          <select
            className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            value={form.rating}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, rating: event.target.value }))}
          >
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <textarea
            className="min-h-24 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_65%,transparent)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            placeholder="Write your review"
            value={form.review}
            onChange={(event) => setForm((prevForm) => ({ ...prevForm, review: event.target.value }))}
            required
          />
        </div>

        <button className="btn-primary mt-5" type="submit">
          Submit Review
        </button>
      </form>
    </section>
  )
}

export default TestimonialsSection
