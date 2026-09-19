import { useEffect, useMemo, useRef, useState } from 'react';
import OrbitalNode from './OrbitalNode';
import { orbitItems, ringConfig } from '../data/orbit';
import { useReducedMotion } from '../hooks/useMediaQuery';

interface OrbitalSystemProps {
  activeId: string | null;
  onSelect: (id: string) => void;
}

/** Central AI core — stays mounted so the orbit never restarts on selection. */
function AICore({ label }: { label: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative grid h-[124px] w-[124px] place-items-center rounded-full border border-azure/30 bg-ink/90 sm:h-[148px] sm:w-[148px]">
        <div className="absolute inset-0 animate-core-pulse rounded-full bg-azure/20 blur-xl" aria-hidden="true" />
        <div className="absolute inset-2 rounded-full border border-hairline" aria-hidden="true" />
        <div className="relative text-center">
          <p className="font-display text-[15px] font-semibold tracking-[0.18em] sm:text-[17px]">AIDIPTO</p>
          <p className="mt-1 font-mono text-[9px] tracking-[0.22em] text-azure sm:text-[10px]">AI CORE</p>
          <p className="mt-2 max-w-[104px] truncate font-mono text-[9px] text-faint" aria-live="polite">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function OrbitalSystem({ activeId, onSelect }: OrbitalSystemProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState(560);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setSize(width);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const rings = useMemo(
    () =>
      ringConfig.map((ring, index) => ({
        ...ring,
        items: orbitItems.filter((item) => item.ring === index),
        radius: (size / 2) * ring.radius,
      })),
    [size],
  );

  const activeLabel = orbitItems.find((item) => item.id === activeId)?.label ?? 'system online';

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square w-full max-w-[min(92vw,720px)]"
      role="group"
      aria-label="AIDIPTO capability map"
    >
      {/* Static ring guides */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <radialGradient id="orbit-fade" cx="50%" cy="50%" r="50%">
            <stop offset="55%" stopColor="rgba(76,141,255,0.10)" />
            <stop offset="100%" stopColor="rgba(76,141,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="url(#orbit-fade)" />
        {ringConfig.map((ring, index) => (
          <circle
            key={index}
            cx="50"
            cy="50"
            r={ring.radius * 50}
            fill="none"
            stroke="rgba(76,141,255,0.16)"
            strokeWidth="0.2"
            strokeDasharray={index === 1 ? '1.2 1.8' : undefined}
          />
        ))}
      </svg>

      <AICore label={activeLabel} />

      {rings.map((ring, ringIndex) => (
        <div
          key={ringIndex}
          className="orbit-ring absolute inset-0"
          style={{
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.direction === -1 ? 'reverse' : 'normal',
          }}
        >
          {ring.items.map((item, itemIndex) => {
            const angle = (360 / ring.items.length) * itemIndex - 90;
            return (
              <div
                key={item.id}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${angle}deg) translateX(${ring.radius}px)` }}
              >
                <OrbitalNode
                  item={item}
                  active={activeId === item.id}
                  radius={ring.radius}
                  onSelect={onSelect}
                  showPacket={!reduced}
                  spinDuration={ring.duration}
                  spinReverse={ring.direction !== -1}
                  packetDelay={(itemIndex * 0.7 + ringIndex * 1.3) % 5.5}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default OrbitalSystem;
