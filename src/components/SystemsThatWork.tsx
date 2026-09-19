import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from './ui/Section';
import { systemsThatWork } from '../data/problemSolutions';
import { useReducedMotion } from '../hooks/useMediaQuery';

export function SystemsThatWork() {
  const reduced = useReducedMotion();

  return (
    <Section
      id="systems"
      label="Systems that work"
      title="The same business, wired differently."
      lede="Nothing here is about buying more tools. It is about what the tools do once they are connected."
    >
      <div className="relative overflow-hidden rounded-xl border border-hairline bg-panel/60">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(560px 260px at 12% -10%, rgba(76,141,255,0.14), transparent 60%), radial-gradient(480px 240px at 100% 110%, rgba(47,232,195,0.10), transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative divide-y divide-hairline">
          {systemsThatWork.map((row, index) => (
            <motion.div
              key={row.id}
              initial={reduced ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: reduced ? 0 : index * 0.12 }}
              className="group relative grid gap-5 p-6 transition-colors duration-300 hover:bg-raised/70 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-8 sm:p-8"
            >
              <p className="text-[clamp(1.05rem,2vw,1.35rem)] text-faint transition-colors duration-300 group-hover:text-muted">
                {row.before}
              </p>

              <div className="relative flex items-center justify-center">
                <span className="pointer-events-none absolute left-1/2 top-1/2 hidden h-px w-24 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-hairline to-transparent sm:block" />
                <span className="relative grid h-10 w-10 place-items-center rounded-full border border-hairline text-faint transition-all duration-300 group-hover:border-azure/60 group-hover:text-azure group-hover:shadow-[0_0_0_6px_rgba(76,141,255,0.10)]">
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className={reduced ? undefined : 'group-hover:animate-bounce-x'}
                  />
                </span>
              </div>

              <div>
                <p className="text-[clamp(1.05rem,2vw,1.35rem)] font-medium text-mist">{row.after}</p>
                <p className="mt-1.5 max-w-[46ch] text-[13.5px] leading-relaxed text-muted transition-opacity duration-300 sm:mt-2 sm:opacity-0 sm:group-hover:opacity-100">
                  {row.note}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default SystemsThatWork;
