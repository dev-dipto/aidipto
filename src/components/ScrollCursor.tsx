import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useReducedMotion } from '../hooks/useMediaQuery';

/**
 * A small circle that trails the mouse cursor. It stays hidden until the
 * page is scrolled, then shows a direction arrow and fades out again once
 * scrolling stops. Desktop-only (fine pointer) and off entirely when the
 * visitor has asked for reduced motion.
 */
export function ScrollCursor() {
  const reduced = useReducedMotion();
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('down');

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  const hideTimer = useRef<number>();
  const lastScrollY = useRef(0);

  /* only show on devices with an actual mouse */
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(pointer: fine)');
    setFinePointer(mql.matches);
    const onChange = (event: MediaQueryListEvent) => setFinePointer(event.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!finePointer || reduced) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const onScroll = () => {
      const current = window.scrollY;
      setDirection(current >= lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = current;
      setVisible(true);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setVisible(false), 650);
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [finePointer, reduced, x, y]);

  if (!finePointer || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-azure/50 bg-ink/80 shadow-[0_8px_28px_-10px_rgba(76,141,255,0.55)] backdrop-blur-sm"
      style={{ x: springX, y: springY }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <motion.span
        key={direction}
        className="text-azure"
        animate={{ y: direction === 'down' ? [-1, 3, -1] : [1, -3, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
      >
        {direction === 'down' ? (
          <ArrowDown size={16} aria-hidden="true" />
        ) : (
          <ArrowUp size={16} aria-hidden="true" />
        )}
      </motion.span>
    </motion.div>
  );
}

export default ScrollCursor;
