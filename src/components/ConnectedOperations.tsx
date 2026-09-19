import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import OperationGraph from './OperationGraph';
import { connectedOperations } from '../data/connectedOperations';
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery';

export function ConnectedOperations() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!isDesktop) return;
    const next = Math.min(
      connectedOperations.length - 1,
      Math.max(0, Math.floor(value * connectedOperations.length)),
    );
    setIndex((prev) => (prev === next ? prev : next));
  });

  const active = connectedOperations[index] ?? connectedOperations[0];

  return (
    <section id="operations" aria-labelledby="operations-title" className="relative">
      <div className="shell pt-20 sm:pt-24">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-hairline via-hairline/50 to-transparent" />
        <header className="max-w-2xl">
          <p className="section-label mb-3">Connected operations</p>
          <h2 id="operations-title" className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            One event, everything downstream.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
            Each service produces a different shape of system. These are the five graphs, drawn as they are
            actually wired.
          </p>
        </header>
      </div>

      {/* Desktop sticky storytelling */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${connectedOperations.length * 86}vh` }}>
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-center">
          <div className="shell grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-12">
            <div>
              <ol className="mb-8 flex gap-2" aria-label="Operation states">
                {connectedOperations.map((operation, i) => (
                  <li
                    key={operation.id}
                    className={`h-0.5 flex-1 rounded transition-colors duration-300 ${
                      i <= index ? 'bg-azure' : 'bg-hairline'
                    }`}
                  />
                ))}
              </ol>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="font-mono text-[11px] tracking-[0.18em] text-azure">{active.index} — {active.title}</p>
                  <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2.1rem)] font-semibold tracking-tight">
                    {active.headline}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted">{active.body}</p>
                  <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
                    {active.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className="font-mono text-[10px] tracking-[0.14em] text-faint">{metric.label}</dt>
                        <dd className="mt-1 text-[14px] text-mist">{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="panel aspect-[5/4] p-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  className="h-full w-full"
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                >
                  <OperationGraph operation={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked, each state with its own diagram */}
      <div className="shell mt-10 grid gap-10 lg:hidden">
        {connectedOperations.map((operation) => (
          <article key={operation.id}>
            <p className="font-mono text-[11px] tracking-[0.18em] text-azure">
              {operation.index} — {operation.title}
            </p>
            <h3 className="mt-2 text-[1.35rem] font-semibold tracking-tight">{operation.headline}</h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{operation.body}</p>
            <div className="panel mt-5 aspect-[4/3] p-3">
              <OperationGraph operation={operation} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ConnectedOperations;
