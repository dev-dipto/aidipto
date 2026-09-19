import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import DemoBadge from './ui/DemoBadge';
import Sparkline, { Bars } from './ui/Sparkline';
import { marketingTabs } from '../data/marketingDemos';
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery';

/**
 * Desktop: a tall scroll track with a `position: sticky` panel — the same
 * pattern as the Services section. Scrolling through the section steps
 * through the seven dashboard views one at a time; native scrolling is
 * never intercepted. Below `lg` the sticky behaviour drops to plain tabs.
 */
export function MarketingSection() {
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
    const next = Math.min(marketingTabs.length - 1, Math.max(0, Math.floor(value * marketingTabs.length)));
    setIndex((prev) => (prev === next ? prev : next));
    setManualId(null);
  });

  const scrollToTab = useCallback(
    (id: string) => {
      const target = marketingTabs.findIndex((tab) => tab.id === id);
      if (target < 0) return;
      if (!isDesktop || !trackRef.current) {
        setManualId(id);
        setIndex(target);
        return;
      }
      const rect = trackRef.current.getBoundingClientRect();
      const trackTop = rect.top + window.scrollY;
      const scrollable = trackRef.current.offsetHeight - window.innerHeight;
      const ratio = (target + 0.5) / marketingTabs.length;
      window.scrollTo({ top: trackTop + scrollable * ratio, behavior: reduced ? 'auto' : 'smooth' });
    },
    [isDesktop, reduced],
  );

  useEffect(() => {
    if (isDesktop) setManualId(null);
  }, [isDesktop]);

  const activeIndex = manualId ? marketingTabs.findIndex((tab) => tab.id === manualId) : index;
  const active = marketingTabs[activeIndex] ?? marketingTabs[0];

  return (
    <section id="marketing" aria-labelledby="marketing-title" className="relative">
      <div className="shell pt-20 sm:pt-24 lg:pt-28">
        <div className="mb-10 h-px w-full bg-gradient-to-r from-hairline via-hairline/50 to-transparent" />
        <header className="max-w-2xl">
          <p className="section-label mb-3">Digital marketing dashboard</p>
          <h2
            id="marketing-title"
            className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight"
          >
            The reporting layer, in the shape you would actually read it.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">
            Seven views of the same funnel. Every figure on this screen is placeholder demo data used to
            show the layout.
          </p>
        </header>
      </div>

      {/* Desktop: scroll-driven sticky panel, one view per scroll step */}
      <div
        ref={trackRef}
        className="relative hidden lg:block"
        style={{ height: `${marketingTabs.length * 78}vh` }}
      >
        <div className="sticky top-[72px] flex h-[calc(100vh-72px)] items-center">
          <div className="shell w-full">
            <MarketingPanel active={active} onSelectTab={scrollToTab} progress={scrollYProgress} />
          </div>
        </div>
      </div>

      {/* Mobile / tablet: tabs, no sticky, no scroll coupling */}
      <div className="shell mt-10 lg:hidden">
        <MarketingPanel
          active={active}
          onSelectTab={(id) => {
            setManualId(id);
            setIndex(marketingTabs.findIndex((tab) => tab.id === id));
          }}
        />
      </div>
    </section>
  );
}

interface MarketingPanelProps {
  active: (typeof marketingTabs)[number];
  onSelectTab: (id: string) => void;
  /** Motion value driving the progress rail — desktop only. */
  progress?: ReturnType<typeof useScroll>['scrollYProgress'];
}

function MarketingPanel({ active, onSelectTab, progress }: MarketingPanelProps) {
  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-4 py-3">
        <div
          role="tablist"
          aria-label="Marketing dashboard views"
          className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {marketingTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === active.id}
              aria-controls={`marketing-panel-${tab.id}`}
              id={`marketing-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`shrink-0 rounded-md px-3 py-2 text-[13px] transition-colors ${
                tab.id === active.id ? 'bg-azure/12 text-mist' : 'text-muted hover:text-mist'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <DemoBadge />
      </div>

      {progress && (
        <div className="h-[3px] w-full bg-hairline" aria-hidden="true">
          <motion.div className="h-full origin-left bg-azure" style={{ scaleX: progress }} />
        </div>
      )}

      <div
        role="tabpanel"
        id={`marketing-panel-${active.id}`}
        aria-labelledby={`marketing-tab-${active.id}`}
        className="max-h-[calc(100vh-220px)] overflow-y-auto p-5 sm:p-6 lg:max-h-[calc(100vh-260px)]"
      >
        <p className="text-[14px] text-muted">{active.caption}</p>

        <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {active.metrics.map((metric) => (
            <motion.div
              key={`${active.id}-${metric.label}`}
              className="bg-ink p-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <p className="font-mono text-[10px] tracking-[0.14em] text-faint">{metric.label}</p>
              <p className="mt-2 font-display text-[1.45rem] font-semibold tracking-tight">{metric.value}</p>
              {metric.delta && (
                <p
                  className={`mt-1 flex items-center gap-1 text-[12px] ${
                    metric.trend === 'down' ? 'text-signal' : 'text-azure'
                  }`}
                >
                  {metric.trend === 'down' ? (
                    <ArrowDownRight size={13} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={13} aria-hidden="true" />
                  )}
                  {metric.delta}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="rounded-lg border border-hairline bg-ink p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.14em] text-faint">TREND — 12 PERIODS</p>
              <span className="font-mono text-[10px] text-faint">demo</span>
            </div>
            <Sparkline values={active.series} label={`${active.label} trend, demo data`} resetKey={active.id} />
          </div>

          <div className="rounded-lg border border-hairline bg-ink p-4">
            <p className="mb-3 font-mono text-[10px] tracking-[0.14em] text-faint">DISTRIBUTION</p>
            <Bars values={active.series} label={`${active.label} distribution, demo data`} resetKey={active.id} />
          </div>
        </div>

        {active.rows && active.rowHeads && (
          <div className="mt-5 overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <caption className="sr-only">{active.label} breakdown — demo data</caption>
              <thead>
                <tr className="bg-ink">
                  {active.rowHeads.map((head) => (
                    <th key={head} scope="col" className="px-4 py-3 font-mono text-[10px] tracking-[0.14em] text-faint">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {active.rows.map((row) => (
                  <tr key={row.name} className="border-t border-hairline">
                    <td className="px-4 py-3 text-[13.5px] text-mist">{row.name}</td>
                    <td className="px-4 py-3 text-[13.5px] text-muted">{row.a}</td>
                    <td className="px-4 py-3 text-[13.5px] text-muted">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketingSection;
