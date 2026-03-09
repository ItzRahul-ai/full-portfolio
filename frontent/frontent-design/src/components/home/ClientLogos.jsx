import { motion as Motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { CLIENT_LOGOS } from '@/utils/constants'

function ClientLogos() {
  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="Clients"
        title="Partnering with startups, agencies, and product teams."
        description="A flexible workflow shaped around product velocity and design quality."
      />

      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--color-border)]">
        <Motion.div
          className="flex gap-4 p-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
        >
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, index) => (
            <div
              key={`${client}-${index}`}
              className="flex min-w-[220px] items-center justify-center rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-soft)_62%,transparent)] px-5 py-5 text-sm tracking-[0.18em] text-[var(--color-muted)] uppercase"
            >
              {client}
            </div>
          ))}
        </Motion.div>
      </div>
    </section>
  )
}

export default ClientLogos
