import { useState } from 'react'
import EnquiryForm from '@/components/forms/EnquiryForm'
import SectionHeading from '@/components/common/SectionHeading'
import { PERSONAL_INFO } from '@/utils/constants'

const formTypes = [
  { id: 'general', label: 'Contact Form', title: 'General Contact' },
  { id: 'service', label: 'Service Request', title: 'Request a Service' },
  { id: 'project', label: 'Project Enquiry', title: 'Project Collaboration Enquiry' },
]

function Contact() {
  const [activeForm, setActiveForm] = useState(formTypes[0])

  return (
    <div>
      <SectionHeading
        eyebrow="Contact"
        title="Start a conversation about your next digital product."
        description="Use the dedicated forms for service requests, project enquiries, or direct contact."
      />

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <article className="glass-panel rounded-3xl p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-muted)]">Direct Contact</p>
          <h3 className="section-title mt-3 text-2xl font-semibold text-[var(--color-text)]">{PERSONAL_INFO.name}</h3>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="mt-4 block text-sm text-[var(--color-text)] hover:text-[var(--color-accent)]">
            {PERSONAL_INFO.email}
          </a>
          <a href={`tel:${PERSONAL_INFO.phone}`} className="mt-2 block text-sm text-[var(--color-text)] hover:text-[var(--color-accent)]">
            {PERSONAL_INFO.phone}
          </a>
          <div className="mt-6 space-y-2">
            <a href={PERSONAL_INFO.facebook} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]">
              Facebook
            </a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="block text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]">
              Instagram
            </a>
          </div>
        </article>

        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {formTypes.map((formType) => (
              <button
                key={formType.id}
                className={activeForm.id === formType.id ? 'btn-primary text-sm' : 'btn-ghost text-sm'}
                onClick={() => setActiveForm(formType)}
              >
                {formType.label}
              </button>
            ))}
          </div>
          <EnquiryForm key={activeForm.id} type={activeForm.id} title={activeForm.title} />
        </div>
      </section>
    </div>
  )
}

export default Contact
