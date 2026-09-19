import type { Service } from '../data/services';

interface ServiceSelectorProps {
  services: Service[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Vertical rail on desktop, horizontal scroller on small screens. */
  orientation?: 'vertical' | 'horizontal';
}

export function ServiceSelector({ services, activeId, onSelect, orientation = 'vertical' }: ServiceSelectorProps) {
  const vertical = orientation === 'vertical';

  return (
    <ul
      className={vertical ? 'relative grid gap-1' : 'no-scrollbar flex gap-2 overflow-x-auto pb-1'}
      role="tablist"
      aria-label="Services"
      aria-orientation={vertical ? 'vertical' : 'horizontal'}
    >
      {services.map((service) => {
        const isActive = service.id === activeId;
        return (
          <li key={service.id} className={vertical ? '' : 'shrink-0'}>
            <button
              type="button"
              role="tab"
              id={`service-tab-${service.id}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${service.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => onSelect(service.id)}
              className={`relative flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors duration-300 ${
                isActive ? 'bg-azure/10 text-mist' : 'text-muted hover:bg-raised/60 hover:text-mist'
              }`}
            >
              <span
                className={`font-mono text-[11px] transition-colors ${isActive ? 'text-azure' : 'text-faint'}`}
              >
                {service.index}
              </span>
              <span className="whitespace-nowrap text-[14.5px] font-medium">{service.title}</span>
              {isActive && (
                <span
                  className={
                    vertical
                      ? 'absolute left-0 top-2 bottom-2 w-px bg-azure'
                      : 'absolute inset-x-3 bottom-0 h-px bg-azure'
                  }
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default ServiceSelector;
