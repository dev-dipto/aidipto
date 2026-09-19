import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import ServiceSelector from './ServiceSelector';
import ServiceWorkflow from './ServiceWorkflow';
import { services } from '../data/services';
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery';

/**
 * Desktop: the section is tall, the inner panel is `position: sticky`, and
 * scroll progress picks the active service. Native scrolling is never
 * intercepted — no wheel handlers, no scroll locking.
 * Mobile: a tab strip plus stacked content, no sticky behaviour.
 */
export function StickyServices() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [manualId, setManualId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (!isDesktop) return;
    const next = Math.min(services.length - 1, Math.max(0, Math.floor(value * services.length)));
    setIndex((prev) => (prev === next ? prev : next));
    setManualId(null);
  });

  const scrollToService = useCallback(
    (id: string) => {
      const target = services.findIndex((service) => service.id === id);
      if (target < 0) return;
      if (!isDesktop || !trackRef.current) {
        setManualId(id);
        setIndex(target);
        return;
      }
      const rect = trackRef.current.getBoundingClientRect();
      const trackTop = rect.top + window.scrollY;
      const scrollable = trackRef.current.offsetHeight - window.innerHeight;
      const ratio = (target + 0.5) / services.length;
      window.scrollTo({ top: trackTop + scrollable * ratio, behavior: reduced ? 'auto' : 'smooth' });
    },
    [isDesktop, reduced],
  );

  useEffect(() => {
    if (isDesktop) setManualId(null);
  }, [isDesktop]);

  const activeIndex = manualId ? services.findIndex((s) => s.id === manualId) : index;
  const active = services[activeIndex] ?? services[0];

  return (
    <section id="services" aria-labelledby="services-title" className="relative">
      <div className="shell pt-20 sm:pt-24 lg:pt-28">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-hairline via-hairline/50 to-transparent" />
        <header className="max-w-2xl">
          <p className="section-label mb-3">Services</p>
          <h2 id="services-title" className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            Five things, built to connect to each other.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
            Each one is a complete piece of work on its own, and each one is designed to plug into the others.
            Scroll through them, or jump straight to the one you need.
          </p>
        </header>
      </div>

      {/* Desktop: scroll-driven sticky panel */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${services.length * 92}vh` }}
      >
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-center">
          <div className="shell w-full">
            <div className="grid grid-cols-[210px_minmax(0,1fr)_minmax(0,1.05fr)] items-start gap-8 xl:gap-12">
              <div className="pt-2">
                <ServiceSelector
                  services={services}
                  activeId={active.id}
                  onSelect={scrollToService}
                  orientation="vertical"
                />
                <div className="mt-6 h-1 w-full overflow-hidden rounded bg-hairline">
                  <motion.div
                    className="h-full origin-left bg-azure"
                    style={{ scaleX: scrollYProgress }}
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] text-faint">
                  {active.index} / {String(services.length).padStart(2, '0')}
                </p>
              </div>

              <ServiceDetail serviceId={active.id} />

              <div>
                <ServiceWorkflow
                  steps={active.workflow}
                  accent={active.accent}
                  title={active.title}
                  resetKey={active.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: tabs, no sticky, no scroll coupling */}
      <div className="shell mt-10 lg:hidden">
        <ServiceSelector
          services={services}
          activeId={active.id}
          onSelect={(id) => {
            setManualId(id);
            setIndex(services.findIndex((s) => s.id === id));
          }}
          orientation="horizontal"
        />
        <div className="mt-6 grid gap-6">
          <ServiceDetail serviceId={active.id} />
          <ServiceWorkflow steps={active.workflow} accent={active.accent} title={active.title} resetKey={active.id} />
        </div>
      </div>
    </section>
  );
}

function ServiceDetail({ serviceId }: { serviceId: string }) {
  const reduced = useReducedMotion();
  const service = services.find((item) => item.id === serviceId);
  if (!service) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={service.id}
        role="tabpanel"
        id={`service-panel-${service.id}`}
        aria-labelledby={`service-tab-${service.id}`}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="font-mono text-[11px] tracking-[0.18em]" style={{ color: service.accent }}>
          {service.index}
        </p>
        <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-2 text-[15px] text-mist/90">{service.summary}</p>
        <p className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed text-muted">{service.description}</p>

        <ul className="mt-6 grid gap-2.5">
          {service.capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-2.5 text-[14px] text-muted">
              <Check size={15} className="mt-0.5 shrink-0" style={{ color: service.accent }} aria-hidden="true" />
              {capability}
            </li>
          ))}
        </ul>

        <a href="#contact" className="btn-ghost mt-7 h-10 py-0 text-[13.5px]">
          Discuss a {service.title.toLowerCase()} project
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

export default StickyServices;
