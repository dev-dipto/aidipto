export type OrbitCategory = 'automation' | 'marketing' | 'commerce' | 'ai' | 'web';

export interface OrbitItem {
  id: string;
  label: string;
  icon: string;
  ring: 0 | 1 | 2;
  category: OrbitCategory;
  headline: string;
  detail: string;
}

/** Single source of truth for the hero orbital system. */
export const orbitItems: OrbitItem[] = [
  {
    id: 'n8n',
    label: 'n8n',
    icon: 'n8n',
    ring: 0,
    category: 'automation',
    headline: 'Workflow orchestration',
    detail: 'Workflow engine used to connect forms, CRMs, inboxes and internal tools.',
  },
  {
    id: 'make',
    label: 'Make',
    icon: 'make',
    ring: 0,
    category: 'automation',
    headline: 'Visual scenarios',
    detail: 'Scenario-based automation for multi-step processes across cloud apps.',
  },
  {
    id: 'zapier',
    label: 'Zapier',
    icon: 'zapier',
    ring: 0,
    category: 'automation',
    headline: 'App-to-app triggers',
    detail: 'Direct connections between everyday tools when a lightweight bridge is enough.',
  },
  {
    id: 'openai',
    label: 'OpenAI',
    icon: 'openai',
    ring: 0,
    category: 'ai',
    headline: 'Language models',
    detail: 'Used for classification, summarising enquiries and drafting structured replies.',
  },
  {
    id: 'ai-agent',
    label: 'AI Agent',
    icon: 'agent',
    ring: 1,
    category: 'ai',
    headline: 'Assisted conversations',
    detail: 'A guided assistant that collects context first, then answers inside that context.',
  },
  {
    id: 'education-ai',
    label: 'Education AI',
    icon: 'education',
    ring: 1,
    category: 'ai',
    headline: 'Learning workflows',
    detail: 'Course enquiry routing, content structuring and student follow-up sequences.',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    icon: 'cart',
    ring: 1,
    category: 'commerce',
    headline: 'Order operations',
    detail: 'Connecting storefront events to fulfilment, customer records and notifications.',
  },
  {
    id: 'shopify',
    label: 'Shopify',
    icon: 'shopify',
    ring: 1,
    category: 'commerce',
    headline: 'Storefront builds',
    detail: 'Theme work, product structure and order workflows on Shopify.',
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    icon: 'wordpress',
    ring: 1,
    category: 'web',
    headline: 'Site platform',
    detail: 'Business sites with forms that feed a workflow instead of a dead inbox.',
  },
  {
    id: 'seo',
    label: 'SEO',
    icon: 'seo',
    ring: 2,
    category: 'marketing',
    headline: 'Search structure',
    detail: 'Technical structure, on-page hierarchy and indexable content architecture.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'analytics',
    ring: 2,
    category: 'marketing',
    headline: 'Measurement',
    detail: 'Event tracking and reporting so decisions follow recorded behaviour.',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'automation',
    ring: 2,
    category: 'automation',
    headline: 'Connected operations',
    detail: 'The layer that keeps website, marketing and customer data moving as one system.',
  },
];

/**
 * Radii are a fraction of the container's half-width. The outer ring stops
 * short of the edge so node pills are never clipped on narrow screens.
 */
export const ringConfig = [
  { radius: 0.46, duration: 64, direction: 1 },
  { radius: 0.66, duration: 92, direction: -1 },
  { radius: 0.84, duration: 118, direction: 1 },
] as const;
