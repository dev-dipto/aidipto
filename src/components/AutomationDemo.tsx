import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, Play, RotateCcw } from 'lucide-react';
import Section from './ui/Section';
import DemoBadge from './ui/DemoBadge';
import { useReducedMotion } from '../hooks/useMediaQuery';

const steps = [
  { id: 'received', label: 'Lead Received', detail: 'Form payload captured from the website' },
  { id: 'ai', label: 'AI Processing', detail: 'Enquiry classified and summarised' },
  { id: 'qualified', label: 'Lead Qualified', detail: 'Scored against the qualification rules' },
  { id: 'crm', label: 'CRM Updated', detail: 'Contact and note written to the record' },
  { id: 'email', label: 'Email Sent', detail: 'Acknowledgement queued to the sender' },
  { id: 'complete', label: 'Automation Complete', detail: 'Run closed and logged' },
];

type Status = 'idle' | 'running' | 'complete';

/**
 * A front-end simulation. Nothing is sent anywhere and no workflow is executed —
 * this only illustrates the order the real steps run in.
 */
export function AutomationDemo() {
  const [status, setStatus] = useState<Status>('idle');
  const [cursor, setCursor] = useState(-1);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const run = useCallback(() => {
    clearTimers();
    setStatus('running');
    setCursor(-1);
    const gap = reduced ? 220 : 900;
    steps.forEach((_, index) => {
      timers.current.push(
        window.setTimeout(() => {
          setCursor(index);
          if (index === steps.length - 1) setStatus('complete');
        }, gap * (index + 1)),
      );
    });
  }, [clearTimers, reduced]);

  const reset = useCallback(() => {
    clearTimers();
    setStatus('idle');
    setCursor(-1);
  }, [clearTimers]);

  return (
    <Section
      id="automation-demo"
      label="Automation demo"
      title="Watch the sequence, step by step."
      lede="This runs in your browser as an illustration of the order the steps happen in. No workflow is triggered and nothing is sent."
    >
      <div className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
          <div className="flex items-center gap-3">
            <DemoBadge label="SIMULATION" />
            <span className="font-mono text-[11px] text-faint">
              status: {status}
              {status === 'running' && ` · step ${Math.max(cursor + 1, 1)}/${steps.length}`}
            </span>
          </div>
          <div className="flex gap-2">
            {status !== 'idle' && (
              <button type="button" onClick={reset} className="btn-ghost h-10 px-4 py-0 text-[13px]">
                <RotateCcw size={15} aria-hidden="true" />
                Reset
              </button>
            )}
            <button
              type="button"
              onClick={run}
              disabled={status === 'running'}
              className="btn-primary h-10 px-4 py-0 text-[13px] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'running' ? (
                <Loader2 size={15} className="animate-spin" aria-hidden="true" />
              ) : (
                <Play size={15} aria-hidden="true" />
              )}
              Run automation demo
            </button>
          </div>
        </div>

        <ol className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const done = index <= cursor;
            const current = status === 'running' && index === cursor + 1;
            return (
              <li key={step.id} className="bg-panel p-5">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      done
                        ? 'border-signal/50 bg-signal/15 text-signal'
                        : current
                          ? 'border-azure/60 bg-azure/10 text-azure'
                          : 'border-hairline text-faint'
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 size={15} aria-hidden="true" />
                    ) : (
                      <span className="font-mono text-[10px]">{index + 1}</span>
                    )}
                  </span>
                  <div>
                    <p className={`text-[14.5px] ${done ? 'text-mist' : 'text-muted'}`}>{step.label}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-faint">{step.detail}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="border-t border-hairline px-5 py-3 font-mono text-[11px] text-faint" role="status" aria-live="polite">
          {status === 'idle' && 'Ready. Press run to step through the sequence.'}
          {status === 'running' && `Processing: ${steps[Math.max(cursor, 0)]?.label ?? steps[0].label}`}
          {status === 'complete' && 'Simulation finished — six steps displayed in order.'}
        </p>
      </div>
    </Section>
  );
}

export default AutomationDemo;
