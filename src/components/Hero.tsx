import { useState } from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import OrbitalSystem from './OrbitalSystem';
import Icon from './ui/Icon';
import { orbitItems } from '../data/orbit';
import { useReducedMotion } from '../hooks/useMediaQuery';

interface HeroProps {
  onOpenAssistant: () => void;
}

export function Hero({ onOpenAssistant }: HeroProps) {
  const [activeId, setActiveId] = useState<string | null>('n8n');
  const reduced = useReducedMotion();
  const active = orbitItems.find((item) => item.id === activeId) ?? null;

  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-floor opacity-[0.35] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />

      <div className="shell relative grid items-center gap-14 pb-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-10 lg:pb-24">
        <div>
          <p className="tag">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            AI automation · Marketing · Web
          </p>

          <h1 className="mt-6 bg-gradient-to-br from-white via-[#cfe0ff] to-azure bg-clip-text text-[clamp(2.3rem,5.4vw,3.9rem)] font-semibold leading-[1.04] tracking-tight text-transparent">
            Your tools already exist. They just aren&rsquo;t talking to each other.
          </h1>

          <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-muted">
            AIDIPTO connects websites, campaigns and customer data into one working system — so an enquiry
            becomes a record, a reply and a report without anyone retyping it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={onOpenAssistant} className="btn-ghost">
              <MessageSquare size={16} aria-hidden="true" />
              DIPTO AI
            </button>
          </div>

          {/* Contextual panel driven by the orbital selection */}
          <div className="mt-10 min-h-[132px]">
            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="panel p-5"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-azure/30 bg-azure/10 text-azure">
                      <Icon name={active.icon} size={17} />
                    </span>
                    <div>
                      <p className="text-[15px] font-medium">{active.label}</p>
                      <p className="font-mono text-[11px] tracking-wide text-faint">{active.headline}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted">{active.detail}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="mt-3 font-mono text-[11px] text-faint">Select any node to read what it does.</p>
          </div>
        </div>

        <div className="relative">
          <OrbitalSystem activeId={activeId} onSelect={setActiveId} />
        </div>
      </div>

      <SystemStrip />
    </section>
  );
}

const stripItems = [
  'n8n',
  'Make',
  'Zapier',
  'OpenAI',
  'WordPress',
  'Shopify',
  'Google Analytics',
  'Meta Ads',
  'Webhooks',
  'REST APIs',
];

/** Continuously running marquee of the tools the workflows are built on. */
function SystemStrip() {
  const reduced = useReducedMotion();
  // duplicated once so the loop can reset invisibly at -50%
  const track = [...stripItems, ...stripItems];

  return (
    <div className="overflow-hidden border-y border-hairline bg-ink/40">
      <div className="shell flex items-center gap-8 py-4">
        <span className="section-label shrink-0">Built with</span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div
            className={reduced ? 'flex flex-wrap items-center gap-x-8 gap-y-3' : 'flex w-max items-center gap-8 animate-marquee'}
          >
            {(reduced ? stripItems : track).map((item, index) => (
              <span key={`${item}-${index}`} className="whitespace-nowrap text-[13px] text-faint">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
