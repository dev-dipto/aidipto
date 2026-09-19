import { Pencil } from 'lucide-react';
import type { LeadProfile } from '../../lib/assistant';

interface ClientInfoCardProps {
  lead: LeadProfile;
  onEdit: () => void;
  onContinue?: () => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="font-mono text-[10.5px] tracking-[0.12em] text-faint">{label}</dt>
      <dd className="truncate text-right text-[13px] text-mist">{value || '—'}</dd>
    </div>
  );
}

export function ClientInfoCard({ lead, onEdit, onContinue }: ClientInfoCardProps) {
  return (
    <div className="grid gap-4">
      <section className="rounded-lg border border-hairline bg-panel p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-mono text-[10.5px] tracking-[0.16em] text-faint">CLIENT INFORMATION</h3>
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 text-[12px] text-azure transition-colors hover:text-mist"
          >
            <Pencil size={12} aria-hidden="true" />
            Edit information
          </button>
        </div>
        <dl className="mt-2 divide-y divide-hairline/70">
          <Row label="NAME" value={lead.name} />
          <Row label="EMAIL" value={lead.email} />
          <Row label="PHONE" value={lead.phone} />
        </dl>
      </section>

      <section className="rounded-lg border border-hairline bg-panel p-4">
        <h3 className="font-mono text-[10.5px] tracking-[0.16em] text-faint">PROJECT CONTEXT</h3>
        <dl className="mt-2 divide-y divide-hairline/70">
          <Row label="BUSINESS TYPE" value={lead.businessType} />
          <Row label="WEBSITE" value={lead.website} />
          <Row label="SERVICE NEEDED" value={lead.service} />
          <Row label="REQUIREMENT" value={lead.requirement} />
          <Row label="BUDGET" value={lead.budget} />
          <Row label="TIMELINE" value={lead.timeline} />
        </dl>
      </section>

      {onContinue && (
        <button type="button" onClick={onContinue} className="btn-primary w-full">
          Continue to AI →
        </button>
      )}
    </div>
  );
}

export default ClientInfoCard;
