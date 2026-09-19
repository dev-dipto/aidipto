import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useMediaQuery';

export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

const frame: Record<DeviceMode, { width: number; aspect: string; radius: number }> = {
  desktop: { width: 1180, aspect: '16 / 10', radius: 12 },
  tablet: { width: 760, aspect: '4 / 5', radius: 18 },
  mobile: { width: 380, aspect: '9 / 17', radius: 26 },
};

interface DevicePreviewProps {
  mode: DeviceMode;
  children: ReactNode;
  caption?: string;
}

/** Animated device frame. The child is real markup, re-laid-out per mode. */
export function DevicePreview({ mode, children, caption }: DevicePreviewProps) {
  const reduced = useReducedMotion();
  const spec = frame[mode];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={false}
        animate={{ maxWidth: spec.width, borderRadius: spec.radius }}
        transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 170, damping: 26 }}
        className="w-full overflow-hidden border border-hairline bg-ink shadow-[0_24px_80px_-40px_rgba(76,141,255,0.45)]"
      >
        <div className="flex items-center gap-2 border-b border-hairline bg-panel px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#2b3546]" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-[#2b3546]" aria-hidden="true" />
          <span className="h-2 w-2 rounded-full bg-[#2b3546]" aria-hidden="true" />
          <span className="ml-2 truncate rounded bg-void px-2 py-0.5 font-mono text-[10px] text-faint">
            {caption ?? 'preview'}
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase text-faint">{mode}</span>
        </div>
        <div style={{ aspectRatio: spec.aspect }} className="w-full">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default DevicePreview;
