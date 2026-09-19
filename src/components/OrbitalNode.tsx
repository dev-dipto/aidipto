import { memo } from 'react';
import type { CSSProperties } from 'react';
import Icon from './ui/Icon';
import type { OrbitItem } from '../data/orbit';

interface OrbitalNodeProps {
  item: OrbitItem;
  active: boolean;
  radius: number;
  onSelect: (id: string) => void;
  showPacket: boolean;
  /** Seconds — matched to the ring so labels stay upright. */
  spinDuration: number;
  spinReverse: boolean;
  packetDelay: number;
}

function OrbitalNodeBase({
  item,
  active,
  radius,
  onSelect,
  showPacket,
  spinDuration,
  spinReverse,
  packetDelay,
}: OrbitalNodeProps) {
  return (
    <>
      {/* Spoke back to the core. It lives inside the rotating wrapper, so it tracks the node. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-px"
        style={{
          left: -radius,
          width: radius,
          background: active
            ? 'linear-gradient(90deg, rgba(76,141,255,0.05), rgba(76,141,255,0.75))'
            : 'linear-gradient(90deg, rgba(90,110,140,0.02), rgba(90,110,140,0.22))',
        }}
      />
      {showPacket && (
        <span
          aria-hidden="true"
          className="orbit-packet pointer-events-none absolute top-0 h-1 w-1 -translate-y-1/2 rounded-full bg-signal"
          style={
            {
              left: -radius,
              '--spoke-len': `${radius}px`,
              animationDuration: '5.5s',
              animationDelay: `${packetDelay}s`,
            } as CSSProperties
          }
        />
      )}

      {/* Counter-rotation keeps the label horizontal while the ring turns. */}
      <span
        className="orbit-counter absolute left-0 top-0 block"
        style={{
          animationDuration: `${spinDuration}s`,
          animationDirection: spinReverse ? 'reverse' : 'normal',
        }}
      >
        <span className="absolute left-0 top-0 block -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={() => onSelect(item.id)}
          aria-pressed={active}
          aria-label={`${item.label} — ${item.headline}`}
          className={`group relative flex items-center gap-2 rounded-full border px-2.5 py-1.5 transition-[transform,background-color,border-color,box-shadow] duration-300 sm:px-3 ${
            active
              ? 'scale-110 border-azure/70 bg-azure/15 text-mist shadow-[0_0_28px_rgba(76,141,255,0.35)]'
              : 'border-hairline bg-ink/85 text-muted hover:scale-105 hover:border-azure/45 hover:text-mist'
          }`}
        >
          <span
            className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors sm:h-7 sm:w-7 ${
              active ? 'bg-azure/25 text-azure' : 'bg-raised text-muted group-hover:text-azure'
            }`}
          >
            <Icon name={item.icon} size={14} />
          </span>
          <span className="whitespace-nowrap text-[11px] font-medium tracking-tight sm:text-[12px]">{item.label}</span>
          {active && (
            <span className="absolute -inset-1 -z-10 animate-core-pulse rounded-full bg-azure/20 blur-md" aria-hidden="true" />
          )}
        </button>
        </span>
      </span>
    </>
  );
}

export const OrbitalNode = memo(OrbitalNodeBase);
export default OrbitalNode;
