import { Mail, Phone, Globe } from 'lucide-react';
import { services } from '../data/services';

const companyLinks = [
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'projects', label: 'Projects' },
  { id: 'faq', label: 'FAQ' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink/60">
      <div className="shell relative py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <p className="font-display text-[19px] font-semibold tracking-[0.16em]">AIDIPTO</p>
            <p className="mt-3 max-w-[34ch] text-[13.5px] leading-relaxed text-muted">
              AI Automation • Digital Marketing • Web Development
            </p>
          </div>

          <nav aria-label="Services">
            <h2 className="section-label">Services</h2>
            <ul className="mt-4 grid gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="text-[13.5px] text-muted transition-colors hover:text-mist">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="section-label">Company</h2>
            <ul className="mt-4 grid gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="text-[13.5px] text-muted transition-colors hover:text-mist">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="section-label">Contact</h2>
            <ul className="mt-4 grid gap-2.5">
              <li>
                <a
                  href="https://www.aidipto.com"
                  className="flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-mist"
                >
                  <Globe size={14} aria-hidden="true" />
                  www.aidipto.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@aidipto.com"
                  className="flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-mist"
                >
                  <Mail size={14} aria-hidden="true" />
                  info@aidipto.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801898880952"
                  className="flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-mist"
                >
                  <Phone size={14} aria-hidden="true" />
                  +8801898880952
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6">
          <p className="font-mono text-[11px] text-faint">© {year} AIDIPTO</p>
          <p className="font-mono text-[11px] text-faint">
            Demos and dashboards on this site use placeholder data.
          </p>
        </div>
      </div>

      {/* Oversized wordmark, very low opacity */}
      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[clamp(4rem,17vw,15rem)] font-bold leading-[0.8] tracking-[-0.02em] text-mist/[0.035]"
      >
        AIDIPTO
      </p>
    </footer>
  );
}

export default Footer;
