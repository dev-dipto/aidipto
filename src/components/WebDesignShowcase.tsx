import { useState } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import Section from './ui/Section';
import DevicePreview from './DevicePreview';
import type { DeviceMode } from './DevicePreview';
import DemoEcommerce from './demos/DemoEcommerce';
import DemoSeoDashboard from './demos/DemoSeoDashboard';
import DemoAiWebsite from './demos/DemoAiWebsite';
import ProjectDetails from './ProjectDetails';
import { projects } from '../data/projects';

const demoTabs = [
  { id: 'ecommerce', label: 'Demo storefront', projectId: 'demo-storefront', caption: 'kotha.demo/shop' },
  { id: 'seo', label: 'Demo SEO dashboard', projectId: 'demo-seo-dashboard', caption: 'app.demo/search' },
  { id: 'ai-website', label: 'Demo AI site', projectId: 'demo-ai-website', caption: 'nodework.demo' },
] as const;

const deviceButtons: { id: DeviceMode; label: string; icon: typeof Monitor }[] = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

export function WebDesignShowcase() {
  const [demo, setDemo] = useState<(typeof demoTabs)[number]['id']>('ecommerce');
  const [mode, setMode] = useState<DeviceMode>('desktop');

  const activeTab = demoTabs.find((tab) => tab.id === demo) ?? demoTabs[0];
  const project = projects.find((item) => item.id === activeTab.projectId);

  return (
    <Section
      id="showcase"
      label="Web design showcase"
      title="Three interfaces, running in the page."
      lede="These are not screenshots. Each preview is a React interface that re-lays-out when you switch device — the same way the real builds do."
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Demo projects" className="no-scrollbar flex gap-1 overflow-x-auto">
          {demoTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={tab.id === demo}
              onClick={() => setDemo(tab.id)}
              className={`shrink-0 rounded-md px-3.5 py-2 text-[13px] transition-colors ${
                tab.id === demo ? 'bg-azure/12 text-mist' : 'text-muted hover:text-mist'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1 rounded-lg border border-hairline p-1" role="group" aria-label="Preview size">
          {deviceButtons.map((button) => {
            const ButtonIcon = button.icon;
            const isActive = mode === button.id;
            return (
              <button
                key={button.id}
                type="button"
                onClick={() => setMode(button.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12.5px] transition-colors ${
                  isActive ? 'bg-azure/15 text-mist' : 'text-muted hover:text-mist'
                }`}
              >
                <ButtonIcon size={14} aria-hidden="true" />
                {button.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <DevicePreview mode={mode} caption={activeTab.caption}>
          {demo === 'ecommerce' && <DemoEcommerce mode={mode} />}
          {demo === 'seo' && <DemoSeoDashboard mode={mode} />}
          {demo === 'ai-website' && <DemoAiWebsite mode={mode} />}
        </DevicePreview>
      </div>

      {project && (
        <div className="mt-8">
          <ProjectDetails project={project} />
        </div>
      )}
    </Section>
  );
}

export default WebDesignShowcase;
