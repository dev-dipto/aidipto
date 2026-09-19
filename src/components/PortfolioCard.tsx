import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';

interface PortfolioCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

export function PortfolioCard({ project, onOpen }: PortfolioCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-panel transition-colors duration-300 hover:border-azure/40">
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        className="relative block aspect-[16/9] w-full overflow-hidden text-left"
        aria-label={`Open details for ${project.title}`}
      >
        <span className="absolute inset-0 block" style={{ backgroundImage: project.gradient }} aria-hidden="true" />
        <span className="absolute inset-0 grid-floor opacity-30" aria-hidden="true" />
        <span className="absolute left-4 top-4 tag bg-void/70">{project.category}</span>
        <span className="absolute bottom-4 right-4 grid h-8 w-8 place-items-center rounded-full border border-hairline bg-void/70 text-muted transition-colors group-hover:border-azure/50 group-hover:text-azure">
          <ArrowUpRight size={15} aria-hidden="true" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[1.05rem] font-medium tracking-tight">{project.title}</h3>
          <span className="shrink-0 font-mono text-[10px] text-faint">{project.status}</span>
        </div>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{project.short}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <li key={tech} className="rounded border border-hairline px-2 py-0.5 font-mono text-[10px] text-faint">
              {tech}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => onOpen(project.id)}
          className="mt-5 self-start text-[13px] text-azure transition-colors hover:text-mist"
        >
          Read the detail
        </button>
      </div>
    </article>
  );
}

export default PortfolioCard;
