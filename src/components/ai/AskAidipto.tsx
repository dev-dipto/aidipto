import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import ChatWindow from './ChatWindow';
import { useReducedMotion } from '../../hooks/useMediaQuery';

interface AskAidiptoProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Floating entry point for the assistant. */
export function AskAidipto({ open, onOpenChange }: AskAidiptoProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="aidipto-assistant"
        className="fixed bottom-5 right-5 z-[55] inline-flex items-center gap-2 rounded-full border border-azure/40 bg-ink/95 px-4 py-3 text-[13.5px] text-mist shadow-[0_18px_50px_-20px_rgba(76,141,255,0.8)] backdrop-blur transition-colors hover:border-azure/70 sm:bottom-7 sm:right-7"
        style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        <MessageSquare size={16} className="text-azure" aria-hidden="true" />
        Ask AIDIPTO
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="aidipto-assistant"
            role="dialog"
            aria-label="AIDIPTO AI assistant"
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="fixed inset-x-3 bottom-[88px] top-[84px] z-[56] sm:inset-x-auto sm:right-7 sm:top-auto sm:h-[min(640px,78vh)] sm:w-[400px]"
          >
            <ChatWindow onClose={() => onOpenChange(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AskAidipto;
