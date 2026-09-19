import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '../data/projects';
import { useReducedMotion } from '../hooks/useMediaQuery';

interface PortfolioModalProps {
  project: Project | null;
  onClose: () => void;
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-void/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-hairline bg-ink sm:rounded-2xl"
            initial={reduced ? false : { y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/7]" style={{ backgroundImage: project.gradient }}>
              <span className="absolute inset-0 grid-floor opacity-30" aria-hidden="true" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-hairline bg-void/70 text-muted hover:text-mist"
                aria-label="Close project details"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">{project.category}</span>
                <span className="tag">{project.status}</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <h3 id="portfolio-modal-title" className="mt-4 text-[1.4rem] font-semibold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{project.description}</p>

              <p className="section-label mt-6">What it covers</p>
              <ul className="mt-3 grid gap-2">
                {project.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-2.5 text-[14px] text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-azure" aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <p className="section-label mt-6">Technology</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech} className="tag">
                    {tech}
                  </li>
                ))}
              </ul>

              <a href="#contact" onClick={onClose} className="btn-primary mt-7 w-full sm:w-auto">
                Discuss a similar build
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PortfolioModal;
