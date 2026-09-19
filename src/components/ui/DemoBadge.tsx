export function DemoBadge({ label = 'DEMO DATA', className = '' }: { label?: string; className?: string }) {
  return (
    <span className={`demo-stamp ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-amberline" aria-hidden="true" />
      {label}
    </span>
  );
}

export default DemoBadge;
