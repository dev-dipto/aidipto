import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useScrolled } from '../hooks/useScrolled';
import { useScrollSpy } from '../hooks/useScrollSpy';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const navIds = navItems.map((item) => item.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(24);
  const active = useScrollSpy(navIds, 140);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open, close]);

  const go = (id: string) => (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    close();
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-hairline bg-void/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-azure focus:px-3 focus:py-2 focus:text-sm focus:text-void"
      >
        Skip to content
      </a>

      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <a href="#home" onClick={go('home')} className="flex items-center gap-2.5" aria-label="AIDIPTO — home">
          <span className="relative grid h-8 w-8 place-items-center rounded-md border border-azure/40 bg-azure/10">
            <span className="h-2 w-2 rounded-full bg-azure shadow-[0_0_12px_2px_rgba(76,141,255,0.6)]" />
            <span className="absolute inset-0 rounded-md border border-azure/20" />
          </span>
          <span className="font-display text-[17px] font-semibold tracking-[0.14em]">AIDIPTO</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative rounded-md px-3 py-2 text-[13.5px] transition-colors ${
                      isActive ? 'text-mist' : 'text-muted hover:text-mist'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-px bg-azure" aria-hidden="true" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" onClick={go('contact')} className="btn-primary hidden h-10 px-4 py-0 text-[13.5px] sm:inline-flex">
            Start a Project
            <ArrowRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-hairline text-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-hairline bg-void/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  className={`block rounded-md px-3 py-3 text-[15px] ${
                    active === item.id ? 'bg-azure/10 text-mist' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={go('contact')} className="btn-primary mt-3 w-full">
            Start a Project
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
