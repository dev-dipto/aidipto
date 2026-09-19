import { ArrowRight, Bot, Gauge, Plug, Workflow } from 'lucide-react';
import DemoBadge from '../ui/DemoBadge';
import type { DeviceMode } from '../DevicePreview';

const capabilities = [
  { id: 'c1', icon: Workflow, title: 'Process mapping', body: 'Every manual step written down before anything is automated.' },
  { id: 'c2', icon: Bot, title: 'Assisted replies', body: 'Enquiries summarised and drafted for a human to approve.' },
  { id: 'c3', icon: Plug, title: 'Tool connections', body: 'Forms, CRM, email and reporting reading the same record.' },
  { id: 'c4', icon: Gauge, title: 'Visible status', body: 'A failed step raises a notification instead of going quiet.' },
];

const automationCards = [
  { id: 'a1', label: 'Enquiry → CRM', meta: 'trigger: form submit' },
  { id: 'a2', label: 'Order → customer record', meta: 'trigger: order paid' },
  { id: 'a3', label: 'Weekly report', meta: 'trigger: schedule' },
];

/** Demo landing page concept for an automation-led business. */
export function DemoAiWebsite({ mode = 'desktop' }: { mode?: DeviceMode }) {
  const wide = mode === 'desktop';
  const roomy = mode !== 'mobile';

  return (
    <div className="h-full overflow-y-auto bg-[#080c13] text-mist">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-hairline bg-[#080c13]/95 px-4 py-3 backdrop-blur">
        <span className="h-2 w-2 rounded-full bg-signal" aria-hidden="true" />
        <span className="font-display text-[12.5px] font-semibold tracking-[0.16em]">NODEWORK</span>
        {wide && (
          <nav aria-label="Demo site" className="ml-5 flex gap-4 text-[12px] text-muted">
            <span>Platform</span>
            <span>Workflows</span>
            <span>Pricing</span>
          </nav>
        )}
        <span className="ml-auto rounded-md border border-hairline px-3 py-1.5 text-[11.5px] text-muted">Book a call</span>
      </header>

      <section className={`grid gap-6 border-b border-hairline px-4 py-8 ${wide ? 'grid-cols-[1.1fr_0.9fr] items-center' : ''}`}>
        <div>
          <DemoBadge label="CONCEPT / DEMO" />
          <h3 className="mt-3 font-display text-[clamp(1.25rem,4.2vw,2rem)] font-semibold leading-[1.1]">
            Put the busywork on rails.
          </h3>
          <p className="mt-3 max-w-[44ch] text-[13px] leading-relaxed text-muted">
            A concept landing page showing how an automation business might present its system — structure,
            capability blocks and a diagram, with nothing invented about results.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-azure px-3.5 py-2 text-[12px] font-medium text-void">
              Map my process <ArrowRight size={13} aria-hidden="true" />
            </span>
            <span className="rounded-md border border-hairline px-3.5 py-2 text-[12px] text-muted">See a workflow</span>
          </div>
        </div>

        {/* System visual */}
        <div className="rounded-xl border border-hairline bg-panel p-4">
          <svg viewBox="0 0 100 62" className="w-full" role="img" aria-label="Demo system diagram">
            <path d="M18 31 H44" stroke="rgba(76,141,255,0.35)" strokeWidth="0.8" />
            <path d="M56 31 H82" stroke="rgba(47,232,195,0.35)" strokeWidth="0.8" />
            <path d="M50 25 V10 H82" stroke="rgba(76,141,255,0.22)" strokeWidth="0.8" fill="none" />
            <path d="M50 37 V52 H82" stroke="rgba(76,141,255,0.22)" strokeWidth="0.8" fill="none" />
            <circle cx="12" cy="31" r="6" fill="#0B111A" stroke="#4C8DFF" strokeWidth="0.7" />
            <circle cx="50" cy="31" r="7.5" fill="#0B111A" stroke="#4C8DFF" strokeWidth="0.9" />
            <circle cx="88" cy="10" r="5.5" fill="#0B111A" stroke="#2FE8C3" strokeWidth="0.7" />
            <circle cx="88" cy="31" r="5.5" fill="#0B111A" stroke="#2FE8C3" strokeWidth="0.7" />
            <circle cx="88" cy="52" r="5.5" fill="#0B111A" stroke="#2FE8C3" strokeWidth="0.7" />
            <text x="12" y="32.5" textAnchor="middle" fill="#8A98AE" fontSize="3">form</text>
            <text x="50" y="32.5" textAnchor="middle" fill="#E7EDF7" fontSize="3.4">engine</text>
            <text x="88" y="11.4" textAnchor="middle" fill="#8A98AE" fontSize="3">crm</text>
            <text x="88" y="32.4" textAnchor="middle" fill="#8A98AE" fontSize="3">email</text>
            <text x="88" y="53.4" textAnchor="middle" fill="#8A98AE" fontSize="3">report</text>
          </svg>
        </div>
      </section>

      <section className="px-4 py-6">
        <p className="font-mono text-[10px] tracking-[0.14em] text-faint">WHAT IT COVERS</p>
        <div className={`mt-3 grid gap-3 ${wide ? 'grid-cols-4' : roomy ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {capabilities.map((capability) => {
            const CapIcon = capability.icon;
            return (
              <div key={capability.id} className="rounded-lg border border-hairline bg-panel p-4">
                <CapIcon size={16} className="text-azure" aria-hidden="true" />
                <p className="mt-2.5 text-[12.5px] font-medium">{capability.title}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">{capability.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-hairline px-4 py-6">
        <p className="font-mono text-[10px] tracking-[0.14em] text-faint">ACTIVE AUTOMATIONS</p>
        <div className={`mt-3 grid gap-2 ${roomy ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {automationCards.map((card) => (
            <div key={card.id} className="rounded-lg border border-hairline bg-panel p-3.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                <p className="truncate text-[12.5px]">{card.label}</p>
              </div>
              <p className="mt-1.5 font-mono text-[10.5px] text-faint">{card.meta}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-hairline px-4 py-4 font-mono text-[10px] text-faint">
        Concept page — illustrative content only.
      </footer>
    </div>
  );
}

export default DemoAiWebsite;
