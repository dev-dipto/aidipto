import { useRef } from 'react';
import { motion, useReducedMotion as useFramerReduced, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from './ui/Section';
import Icon from './ui/Icon';
import { problemSolutions } from '../data/problemSolutions';

function Row({ item, index }: { item: (typeof problemSolutions)[number]; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const reduced = useFramerReduced();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 88%', 'center 45%'] });
  const x = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -24, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0.25, 1]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity }}
      className="grid items-center gap-3 border-t border-hairline py-5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] sm:gap-5"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-faint">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-[15px] text-muted">{item.problem}</span>
      </div>

      <ArrowRight size={15} className="hidden text-faint sm:block" aria-hidden="true" />

      <motion.div style={{ x }} className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-azure/30 bg-azure/10 text-azure">
          <Icon name={item.icon} size={15} />
        </span>
        <span className="text-[15px] text-mist">{item.system}</span>
      </motion.div>

      <ArrowRight size={15} className="hidden text-azure/70 sm:block" aria-hidden="true" />

      <span className="text-[15px] text-signal">{item.improvement}</span>
    </motion.li>
  );
}

export function ProblemSolutions() {
  return (
    <Section
      id="problems"
      label="Problem → System → Improvement"
      title="What usually breaks, and what replaces it."
      lede="Every line below is a process that runs on manual effort today. The middle column is the piece AIDIPTO builds."
    >
      <ul className="border-b border-hairline">
        {problemSolutions.map((item, index) => (
          <Row key={item.id} item={item} index={index} />
        ))}
      </ul>
    </Section>
  );
}

export default ProblemSolutions;
