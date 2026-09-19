import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon';
import type { WorkflowStep } from '../data/services';
import { useReducedMotion } from '../hooks/useMediaQuery';

interface ServiceWorkflowProps {
  steps: WorkflowStep[];
  accent: string;
  title: string;
  /** Restarts the traveling highlight when the service changes. */
  resetKey: string;
}

/** Animated left-to-right workflow. One step is highlighted at a time. */
export function ServiceWorkflow({ steps, accent, title, resetKey }: ServiceWorkflowProps) {
  const reduced = useReducedMotion();
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    setCursor(0);
    if (reduced) return;
    const id = window.setInterval(() => {
      setCursor((value) => (value + 1) % steps.length);
    }, 1400);
    return () => window.clearInterval(id);
  }, [resetKey, steps.length, reduced]);

  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
        <p className="font-mono text-[11px] tracking-[0.16em] text-faint">WORKFLOW — {title.toUpperCase()}</p>
        <span className="flex items-center gap-1.5 font-mono text-[10px] text-faint">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} aria-hidden="true" />
          {steps.length} steps
        </span>
      </div>

      <ol className="grid gap-0 p-4 sm:p-5">
        {steps.map((step, index) => {
          const isActive = !reduced && index === cursor;
          const isPast = !reduced && index < cursor;
          return (
            <li key={step.id} className="relative">
              <div
                className={`flex items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-500 sm:gap-4 sm:px-4 ${
                  isActive ? 'border-transparent bg-raised' : 'border-transparent'
                }`}
                style={isActive ? { boxShadow: `inset 0 0 0 1px ${accent}55` } : undefined}
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border transition-colors duration-500 sm:h-11 sm:w-11"
                  style={{
                    borderColor: isActive || isPast ? `${accent}66` : '#1A2533',
                    background: isActive ? `${accent}1f` : 'transparent',
                    color: isActive || isPast ? accent : '#8A98AE',
                  }}
                >
                  <Icon name={step.icon} size={19} />
                </span>

                <div className="min-w-0">
                  <p className={`truncate text-[14.5px] transition-colors ${isActive ? 'text-mist' : 'text-muted'}`}>
                    {step.label}
                  </p>
                  {step.note && <p className="truncate font-mono text-[10.5px] text-faint">{step.note}</p>}
                </div>

                <span className="ml-auto font-mono text-[10px] text-faint">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="relative ml-[31px] h-4 w-px bg-hairline sm:ml-[35px]">
                  {!reduced && (
                    <motion.span
                      className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                      style={{ background: accent }}
                      initial={{ opacity: 0, y: 0 }}
                      animate={isActive ? { opacity: [0, 1, 0], y: [0, 16] } : { opacity: 0 }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default ServiceWorkflow;
