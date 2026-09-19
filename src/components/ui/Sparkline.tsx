import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useMediaQuery';

interface SparklineProps {
  values: number[];
  stroke?: string;
  fill?: string;
  height?: number;
  label: string;
  /** Changing this restarts the draw-in animation (e.g. when the tab changes). */
  resetKey?: string;
}

/** Inline SVG chart — no charting library, no canvas. The line draws in on mount/reset. */
export function Sparkline({
  values,
  stroke = '#4C8DFF',
  fill = 'rgba(76,141,255,0.16)',
  height = 120,
  label,
  resetKey,
}: SparklineProps) {
  const reduced = useReducedMotion();
  if (values.length === 0) return null;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100;
    const y = 100 - ((value - min) / span) * 88 - 6;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  });

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ height }}
      className="w-full"
      role="img"
      aria-label={label}
    >
      <motion.polygon
        key={`fill-${resetKey}`}
        points={`0,100 ${points.join(' ')} 100,100`}
        fill={fill}
        stroke="none"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      />
      <motion.polyline
        key={`line-${resetKey}`}
        points={points.join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduced ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeInOut' }}
      />
    </svg>
  );
}

export function Bars({ values, label, resetKey }: { values: number[]; label: string; resetKey?: string }) {
  const reduced = useReducedMotion();
  const max = Math.max(...values) || 1;
  return (
    <div className="flex h-[120px] items-end gap-1.5" role="img" aria-label={label}>
      {values.map((value, index) => (
        <motion.span
          key={`${resetKey}-${index}`}
          className="flex-1 rounded-sm bg-gradient-to-t from-azure/20 to-azure/70"
          initial={reduced ? false : { height: 0 }}
          animate={{ height: `${Math.max(6, (value / max) * 100)}%` }}
          transition={{ duration: 0.6, delay: reduced ? 0 : index * 0.045, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default Sparkline;
