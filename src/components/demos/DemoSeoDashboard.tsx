import { AlertTriangle, CheckCircle2, Info, Link2, Search, TrendingUp } from 'lucide-react';
import DemoBadge from '../ui/DemoBadge';
import Sparkline, { Bars } from '../ui/Sparkline';
import type { DeviceMode } from '../DevicePreview';

const traffic = [28, 34, 31, 42, 39, 48, 52, 47, 58, 63, 61, 72];
const visibility = [12, 16, 15, 21, 25, 24, 30, 33, 36, 39, 44, 47];

const keywords = [
  { term: 'workflow automation setup', volume: '1,200', position: 4, change: '+3' },
  { term: 'shopify order automation', volume: '880', position: 9, change: '+1' },
  { term: 'wordpress lead capture', volume: '640', position: 12, change: '-2' },
  { term: 'crm integration service', volume: '410', position: 17, change: '+5' },
];

const issues = [
  { id: 'i1', level: 'high', label: '3 pages missing meta description', icon: AlertTriangle },
  { id: 'i2', level: 'medium', label: '7 images without alt text', icon: Info },
  { id: 'i3', level: 'ok', label: 'Sitemap submitted and readable', icon: CheckCircle2 },
];

const levelStyle: Record<string, string> = {
  high: 'text-amberline border-amberline/40 bg-amberline/10',
  medium: 'text-azure border-azure/40 bg-azure/10',
  ok: 'text-signal border-signal/40 bg-signal/10',
};

/** Demo SEO reporting interface. All values are placeholders. */
export function DemoSeoDashboard({ mode = 'desktop' }: { mode?: DeviceMode }) {
  const wide = mode === 'desktop';
  const roomy = mode !== 'mobile';

  return (
    <div className="h-full overflow-y-auto bg-[#080c13] text-mist">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-hairline bg-[#080c13]/95 px-4 py-3 backdrop-blur">
        <Search size={15} className="text-azure" aria-hidden="true" />
        <span className="text-[13px] font-medium">Search performance</span>
        <DemoBadge className="ml-auto" />
      </header>

      <div className={`grid gap-3 p-4 ${wide ? 'grid-cols-4' : roomy ? 'grid-cols-2' : 'grid-cols-2'}`}>
        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint">SEO SCORE</p>
          <div className="mt-2 flex items-end gap-2">
            <span className="font-display text-[1.7rem] font-semibold leading-none">78</span>
            <span className="pb-0.5 font-mono text-[11px] text-signal">+4</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded bg-hairline">
            <span className="block h-full w-[78%] rounded bg-gradient-to-r from-azure to-signal" />
          </div>
        </div>

        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint">ORGANIC TRAFFIC</p>
          <p className="mt-2 font-display text-[1.7rem] font-semibold leading-none">12.4k</p>
          <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-azure">
            <TrendingUp size={12} aria-hidden="true" /> +8.2%
          </p>
        </div>

        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint">KEYWORDS</p>
          <p className="mt-2 font-display text-[1.7rem] font-semibold leading-none">312</p>
          <p className="mt-1.5 font-mono text-[11px] text-muted">48 in top 10</p>
        </div>

        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="font-mono text-[10px] tracking-[0.14em] text-faint">BACKLINKS</p>
          <p className="mt-2 font-display text-[1.7rem] font-semibold leading-none">1,046</p>
          <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-muted">
            <Link2 size={12} aria-hidden="true" /> 184 domains
          </p>
        </div>
      </div>

      <div className={`grid gap-3 px-4 ${wide ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-faint">TRAFFIC — 12 PERIODS</p>
          <Sparkline values={traffic} height={100} label="Organic traffic trend, demo data" />
        </div>
        <div className="rounded-lg border border-hairline bg-panel p-4">
          <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-faint">SEARCH VISIBILITY</p>
          <Bars values={visibility} label="Search visibility, demo data" />
        </div>
      </div>

      <div className="p-4">
        <div className="overflow-hidden rounded-lg border border-hairline">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Tracked keywords — demo data</caption>
            <thead>
              <tr className="bg-panel">
                <th scope="col" className="px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-faint">KEYWORD</th>
                {roomy && (
                  <th scope="col" className="px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-faint">VOLUME</th>
                )}
                <th scope="col" className="px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-faint">POS.</th>
                <th scope="col" className="px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-faint">CHG</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((keyword) => (
                <tr key={keyword.term} className="border-t border-hairline">
                  <td className="px-3 py-2.5 text-[12.5px] text-mist">{keyword.term}</td>
                  {roomy && <td className="px-3 py-2.5 font-mono text-[12px] text-muted">{keyword.volume}</td>}
                  <td className="px-3 py-2.5 font-mono text-[12px] text-muted">{keyword.position}</td>
                  <td
                    className={`px-3 py-2.5 font-mono text-[12px] ${
                      keyword.change.startsWith('-') ? 'text-amberline' : 'text-signal'
                    }`}
                  >
                    {keyword.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-4 pb-5">
        <p className="mb-2 font-mono text-[10px] tracking-[0.14em] text-faint">TECHNICAL SEO</p>
        <ul className="grid gap-2">
          {issues.map((issue) => {
            const IssueIcon = issue.icon;
            return (
              <li
                key={issue.id}
                className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-[12.5px] ${levelStyle[issue.level]}`}
              >
                <IssueIcon size={14} aria-hidden="true" />
                {issue.label}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default DemoSeoDashboard;
