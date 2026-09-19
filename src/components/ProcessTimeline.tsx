import Section from './ui/Section';
import { processStages } from '../data/process';

export function ProcessTimeline() {
  return (
    <Section
      id="process"
      label="Process"
      title="Four stages, in this order."
      lede="The sequence matters more than the speed. Nothing gets built before the thing it replaces is written down."
    >
      <ol className="relative grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-2 xl:grid-cols-4">
        {processStages.map((stage) => (
          <li key={stage.id} className="relative bg-panel p-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-azure">{stage.index}</span>
              <span className="h-px flex-1 bg-hairline" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-[1.15rem] font-medium tracking-tight">{stage.title}</h3>
            <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{stage.body}</p>
            <p className="mt-5 font-mono text-[10.5px] tracking-[0.12em] text-faint">{stage.deliverable}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export default ProcessTimeline;
