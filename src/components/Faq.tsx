import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './ui/Section';
import { faqs } from '../data/faq';
import { useReducedMotion } from '../hooks/useMediaQuery';

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const reduced = useReducedMotion();

  return (
    <Section
      id="faq"
      label="FAQ"
      title="The questions that come up first."
      lede="If yours is not here, the assistant or the contact form will get it to a person."
    >
      <div className="max-w-3xl divide-y divide-hairline border-y border-hairline">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id}>
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  id={`faq-button-${faq.id}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className={`text-[15.5px] transition-colors ${isOpen ? 'text-mist' : 'text-muted'}`}>
                    {faq.question}
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      isOpen ? 'rotate-45 border-azure/50 text-azure' : 'border-hairline text-faint'
                    }`}
                    aria-hidden="true"
                  >
                    <Plus size={14} />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[62ch] pb-6 pr-10 text-[14.5px] leading-relaxed text-muted">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export default Faq;
