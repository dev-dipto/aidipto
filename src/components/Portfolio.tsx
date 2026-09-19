import { useMemo, useState } from 'react';
import Section from './ui/Section';
import PortfolioCard from './PortfolioCard';
import PortfolioFilter from './PortfolioFilter';
import PortfolioModal from './PortfolioModal';
import { portfolioFilters, projects } from '../data/projects';

export function Portfolio() {
  const [filter, setFilter] = useState<string>('All');
  const [openId, setOpenId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: projects.length };
    for (const filterName of portfolioFilters) {
      if (filterName === 'All') continue;
      result[filterName] = projects.filter((project) => project.category === filterName).length;
    }
    return result;
  }, []);

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  const openProject = projects.find((project) => project.id === openId) ?? null;

  return (
    <Section
      id="projects"
      label="Projects"
      title="Concept and demo builds."
      lede="Everything here was built by AIDIPTO to show approach and structure. No client names, figures or results are published."
    >
      <PortfolioFilter filters={portfolioFilters} active={filter} counts={counts} onChange={setFilter} />

      <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <PortfolioCard key={project.id} project={project} onOpen={setOpenId} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-8 rounded-lg border border-dashed border-hairline p-8 text-center text-[14px] text-muted">
          Nothing in this category yet. Pick another filter, or send the brief you have in mind.
        </p>
      )}

      <PortfolioModal project={openProject} onClose={() => setOpenId(null)} />
    </Section>
  );
}

export default Portfolio;
