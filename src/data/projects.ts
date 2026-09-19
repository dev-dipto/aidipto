export type ProjectCategory =
  | 'AI Automation'
  | 'Digital Marketing'
  | 'Web Design'
  | 'WordPress'
  | 'Shopify';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  short: string;
  description: string;
  technologies: string[];
  status: 'Concept' | 'Demo build' | 'In progress';
  /** Which in-page demo to render as the preview, if any. */
  demo?: 'ecommerce' | 'seo' | 'ai-website';
  gradient: string;
  outcomes: string[];
}

/**
 * These are concept and demo builds created by AIDIPTO to show approach.
 * No client names, results or metrics are claimed anywhere.
 */
export const projects: Project[] = [
  {
    id: 'demo-storefront',
    title: 'Demo storefront',
    category: 'Shopify',
    tags: ['E-commerce', 'Automation'],
    short: 'A storefront interface with cart, product cards and order workflow.',
    description:
      'A demo commerce interface built to show product structure, cart behaviour and how an order event can continue into customer data, email and reporting.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Shopify concepts'],
    status: 'Demo build',
    demo: 'ecommerce',
    gradient: 'linear-gradient(135deg,#0d1b2e,#123b3a)',
    outcomes: [
      'Product grid, cart state and featured rail as working components',
      'Order event mapped to customer record, email and analytics',
      'Layout verified from 390px to 1440px',
    ],
  },
  {
    id: 'demo-seo-dashboard',
    title: 'Demo SEO dashboard',
    category: 'Digital Marketing',
    tags: ['Marketing', 'SaaS'],
    short: 'A reporting interface for search performance and technical health.',
    description:
      'A dashboard concept covering visibility, keywords, backlinks and technical issues. All values on screen are placeholder demo data used to show layout and hierarchy.',
    technologies: ['React', 'SVG charts', 'Tailwind CSS'],
    status: 'Demo build',
    demo: 'seo',
    gradient: 'linear-gradient(135deg,#0b1f1c,#0d1830)',
    outcomes: [
      'Score, traffic, keyword and backlink panels',
      'Inline SVG charts with no charting dependency',
      'Issue list with severity indicators',
    ],
  },
  {
    id: 'demo-ai-website',
    title: 'Demo AI business site',
    category: 'Web Design',
    tags: ['AI', 'Local Business'],
    short: 'A landing page concept for an automation-led business.',
    description:
      'A landing page demo with hero, capability blocks, automation cards and a system diagram — built to show structure and motion rather than to represent a live client.',
    technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
    status: 'Concept',
    demo: 'ai-website',
    gradient: 'linear-gradient(135deg,#101431,#1b2c4d)',
    outcomes: [
      'Hero, features and capability blocks as reusable components',
      'System diagram drawn in SVG',
      'Reduced-motion fallback for every animated element',
    ],
  },
  {
    id: 'lead-routing',
    title: 'Lead routing workflow',
    category: 'AI Automation',
    tags: ['Automation', 'AI'],
    short: 'A workflow concept from form submission to qualified record.',
    description:
      'A workflow design that takes a website enquiry, classifies it with a language model, writes a CRM record and sends the internal notification. Presented here as an interactive simulation.',
    technologies: ['n8n', 'Make', 'OpenAI API', 'Webhooks'],
    status: 'Concept',
    gradient: 'linear-gradient(135deg,#0b1424,#1d2a4f)',
    outcomes: [
      'Six-step path with defined inputs and outputs',
      'Classification prompt kept server-side in a real build',
      'Simulated end-to-end run available on this page',
    ],
  },
  {
    id: 'wp-enquiry',
    title: 'WordPress enquiry system',
    category: 'WordPress',
    tags: ['Local Business', 'Automation'],
    short: 'A business site where the contact form starts a process.',
    description:
      'A WordPress structure concept where form submissions leave the mailbox and enter a defined workflow that creates a record and triggers a response.',
    technologies: ['WordPress', 'REST hooks', 'n8n', 'SMTP'],
    status: 'Concept',
    gradient: 'linear-gradient(135deg,#131a2b,#243b55)',
    outcomes: [
      'Form submission mapped to a webhook trigger',
      'CRM record created from the same payload',
      'Editor-friendly template structure',
    ],
  },
  {
    id: 'campaign-reporting',
    title: 'Campaign reporting layer',
    category: 'Digital Marketing',
    tags: ['Marketing', 'Automation'],
    short: 'Channel data collected into a single readable report.',
    description:
      'A reporting concept that pulls search, social and paid activity into one view so campaign decisions are made against one funnel rather than separate exports.',
    technologies: ['Analytics events', 'Make', 'Sheets', 'React'],
    status: 'In progress',
    gradient: 'linear-gradient(135deg,#09201d,#14304a)',
    outcomes: [
      'Shared event schema across channels',
      'Scheduled report assembly',
      'Dashboard tabs per channel',
    ],
  },
];

export const portfolioFilters = [
  'All',
  'AI Automation',
  'Digital Marketing',
  'Web Design',
  'WordPress',
  'Shopify',
] as const;
