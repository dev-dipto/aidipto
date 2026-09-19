interface PortfolioFilterProps {
  filters: readonly string[];
  active: string;
  counts: Record<string, number>;
  onChange: (value: string) => void;
}

export function PortfolioFilter({ filters, active, counts, onChange }: PortfolioFilterProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter projects">
      {filters.map((filter) => {
        const isActive = filter === active;
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
              isActive
                ? 'border-azure/60 bg-azure/10 text-mist'
                : 'border-hairline text-muted hover:border-azure/35 hover:text-mist'
            }`}
          >
            {filter}
            <span className="ml-2 font-mono text-[10px] text-faint">{counts[filter] ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}

export default PortfolioFilter;
