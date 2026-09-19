import { ArrowRight, MessageSquare } from 'lucide-react';
import { useReducedMotion } from '../hooks/useMediaQuery';

/** Final call to action with a filled orbital mark. */
export function SmartCTA({ onOpenAssistant }: { onOpenAssistant: () => void }) {
  const reduced = useReducedMotion();

  return (
    <section id="cta" aria-labelledby="cta-title" className="relative overflow-hidden py-24 sm:py-28">
      <div className="shell grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
        <div>
          <h2 id="cta-title" className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold leading-[1.06] tracking-tight">
            Let&rsquo;s build something smarter.
          </h2>
          <p className="mt-5 max-w-[52ch] text-[15.5px] leading-relaxed text-muted">
            Send the parts of your process that keep costing time. You get a written scope back — what would be
            built, what it connects to, and what stays manual.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Send project request
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={onOpenAssistant} className="btn-ghost">
              <MessageSquare size={16} aria-hidden="true" />
              Ask AIDIPTO AI
            </button>
          </div>
        </div>

        <div className="relative mx-auto h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(76,141,255,0.30), rgba(76,141,255,0.06) 58%, transparent 72%)',
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-6 rounded-full border border-azure/25 bg-ink/50" aria-hidden="true" />
          <div className="absolute inset-16 rounded-full border border-hairline" aria-hidden="true" />

          {/* Two slow orbits with a node each */}
          <div className={`absolute inset-6 ${reduced ? '' : 'animate-spin-slow'}`} aria-hidden="true">
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-azure shadow-[0_0_18px_4px_rgba(76,141,255,0.55)]" />
          </div>
          <div className={`absolute inset-16 ${reduced ? '' : 'animate-spin-rev'}`} aria-hidden="true">
            <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_14px_3px_rgba(47,232,195,0.5)]" />
          </div>

          <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-azure/40 bg-ink">
            <span className="animate-core-pulse absolute inset-0 rounded-full bg-azure/25 blur-lg" aria-hidden="true" />
            <span className="relative font-display text-[11px] font-semibold tracking-[0.2em]">AIDIPTO</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartCTA;
