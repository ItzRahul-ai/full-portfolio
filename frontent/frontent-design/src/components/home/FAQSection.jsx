import { useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import SectionHeading from '@/components/common/SectionHeading'
import { FAQ_ITEMS } from '@/utils/constants'

function FAQSection() {
  const [openId, setOpenId] = useState(FAQ_ITEMS[0].id)

  return (
    <section className="mt-28">
      <SectionHeading
        eyebrow="FAQ"
        title="Answers to common client and project questions."
        description="Transparent process, architecture, and delivery expectations."
      />

      <div className="mt-8 space-y-3">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id
          return (
            <article key={item.id} className="glass-panel overflow-hidden rounded-2xl">
              <button
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpenId((prevId) => (prevId === item.id ? '' : item.id))}
              >
                <span className="text-base font-medium text-[var(--color-text)]">{item.question}</span>
                <span className="text-xl text-[var(--color-accent)]">{isOpen ? '-' : '+'}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <Motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="border-t border-[var(--color-border)] px-5 py-4">
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">{item.answer}</p>
                    </div>
                  </Motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default FAQSection
