export interface ProblemSolution {
  id: string;
  problem: string;
  system: string;
  improvement: string;
  icon: string;
}

export const problemSolutions: ProblemSolution[] = [
  {
    id: 'shopify-orders',
    problem: 'Manual Shopify Orders',
    system: 'Shopify Automation',
    improvement: 'Connected Order Workflow',
    icon: 'cart',
  },
  {
    id: 'lead-followup',
    problem: 'Slow Lead Follow-up',
    system: 'Lead Automation',
    improvement: 'Faster Structured Follow-up',
    icon: 'inbox',
  },
  {
    id: 'customer-data',
    problem: 'Scattered Customer Data',
    system: 'CRM Automation',
    improvement: 'Connected Customer Data',
    icon: 'database',
  },
  {
    id: 'repeat-questions',
    problem: 'Repeated Customer Questions',
    system: 'AI Chatbot',
    improvement: 'AI-Assisted Conversations',
    icon: 'agent',
  },
  {
    id: 'data-processing',
    problem: 'Manual Data Processing',
    system: 'AI Data Processing',
    improvement: 'Structured Automated Actions',
    icon: 'cpu',
  },
];

export interface SystemRow {
  id: string;
  before: string;
  after: string;
  note: string;
}

export const systemsThatWork: SystemRow[] = [
  {
    id: 'website',
    before: 'Static website',
    after: 'Connected website',
    note: 'The site stops being a brochure and becomes the entry point of a process.',
  },
  {
    id: 'followup',
    before: 'Manual follow-up',
    after: 'Automated follow-up',
    note: 'Response time no longer depends on who happens to check the inbox.',
  },
  {
    id: 'tools',
    before: 'Scattered tools',
    after: 'Connected workflows',
    note: 'One record moves between tools instead of being retyped into each one.',
  },
];
