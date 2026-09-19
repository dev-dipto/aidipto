import { ArrowRight } from 'lucide-react';
import type { Project } from '../data/projects';

/** Sits directly under the preview so the detail is never pushed far below it. */
export function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      <div className="bg-panel p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-[1.25rem] font-semibold tracking-tight">{project.title}</h3>
          <span className="tag">{project.category}</span>
          <span className="tag">{project.status}</span>
        </div>
        <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 grid gap-2">
          {project.outcomes.map((outcome) => (
            <li key={outcome} className="flex gap-2.5 text-[14px] text-muted">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-azure" aria-hidden="true" />
              {outcome}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-between gap-6 bg-panel p-6">
        <div>
          <p className="section-label">Technology and services</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="tag">
                {tech}
              </li>
            ))}
          </ul>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <a href="#contact" className="btn-primary w-full">
          Start something like this
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

export default ProjectDetails;
