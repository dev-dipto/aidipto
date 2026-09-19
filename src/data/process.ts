export interface ProcessStage {
  id: string;
  index: string;
  title: string;
  body: string;
  deliverable: string;
}

export const processStages: ProcessStage[] = [
  {
    id: 'scope',
    index: '01',
    title: 'Scope',
    body: 'We map what happens today — every manual step, every place data is retyped — and write down what the build will and will not cover.',
    deliverable: 'Written scope document',
  },
  {
    id: 'design',
    index: '02',
    title: 'Design',
    body: 'Structure first: page hierarchy or workflow graph, then the interface or the automation logic that sits on top of it.',
    deliverable: 'Wireframes or workflow diagram',
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    body: 'Components and workflows are built against the scope, with error paths defined before anything is connected to live data.',
    deliverable: 'Working environment to review',
  },
  {
    id: 'handover',
    index: '04',
    title: 'Handover',
    body: 'You get the working system, the documentation for it, and a walkthrough of how to change it without breaking the parts that matter.',
    deliverable: 'Documentation and walkthrough',
  },
];

export const whyPoints = [
  {
    id: 'scope-first',
    title: 'Scope before code',
    body: 'Nothing is built until the path it replaces is written down. It makes disagreements cheap and early.',
  },
  {
    id: 'one-system',
    title: 'One system, not five tools',
    body: 'Website, marketing and customer data are treated as one connected process rather than separate purchases.',
  },
  {
    id: 'no-claims',
    title: 'No invented proof',
    body: 'Demos are labelled as demos. There are no borrowed logos, testimonials or result figures on this site.',
  },
  {
    id: 'handover',
    title: 'Built to be handed over',
    body: 'Documented structure and readable workflows, so the system survives after the project ends.',
  },
];
