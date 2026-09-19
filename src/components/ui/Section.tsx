import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  label?: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Adds a hairline rule above the section heading. */
  rule?: boolean;
}

export function Section({ id, label, title, lede, children, className = '', rule = true }: SectionProps) {
  return (
    <section id={id} className={`relative py-20 sm:py-24 lg:py-28 ${className}`} aria-labelledby={`${id}-title`}>
      <div className="shell">
        {rule && <div className="mb-10 h-px w-full bg-gradient-to-r from-hairline via-hairline/50 to-transparent" />}
        <header className="max-w-2xl">
          {label && <p className="section-label mb-3">{label}</p>}
          <h2 id={`${id}-title`} className="text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight">
            {title}
          </h2>
          {lede && <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted">{lede}</p>}
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default Section;
