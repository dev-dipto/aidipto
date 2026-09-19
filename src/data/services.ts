export interface WorkflowStep {
  id: string;
  label: string;
  icon: string;
  note?: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  summary: string;
  description: string;
  capabilities: string[];
  workflow: WorkflowStep[];
  accent: string;
}

/** Exactly five primary services. Sub-services live inside `capabilities`. */
export const services: Service[] = [
  {
    id: 'ai-automation',
    index: '01',
    title: 'AI Automation',
    summary: 'Connect the steps that currently happen by hand.',
    description:
      'Enquiries arrive, get read by a person, get copied somewhere, then wait. Automation removes the copying and the waiting so the same enquiry moves through one defined path.',
    capabilities: [
      'Lead capture and routing',
      'AI classification of enquiries',
      'CRM record creation',
      'Email and WhatsApp notifications',
      'Internal reporting triggers',
    ],
    accent: '#4C8DFF',
    workflow: [
      { id: 'website', label: 'Website', icon: 'globe' },
      { id: 'form', label: 'Form', icon: 'form' },
      { id: 'lead', label: 'Lead Received', icon: 'inbox' },
      { id: 'ai', label: 'AI Processing', icon: 'cpu', note: 'classify + summarise' },
      { id: 'qualified', label: 'Lead Qualified', icon: 'check' },
      { id: 'crm', label: 'CRM', icon: 'database' },
      { id: 'email', label: 'Email', icon: 'mail' },
      { id: 'notify', label: 'Notification', icon: 'bell' },
    ],
  },
  {
    id: 'digital-marketing',
    index: '02',
    title: 'Digital Marketing',
    summary: 'Traffic that is measured, not guessed.',
    description:
      'Campaign work is only useful when the numbers behind it are readable. The structure below covers analysis, search, paid channels and the reporting that closes the loop.',
    capabilities: [
      'Website and funnel analysis',
      'Search structure and on-page SEO',
      'Facebook and Meta audience analysis',
      'Paid campaign setup',
      'Analytics dashboards and reporting',
    ],
    accent: '#2FE8C3',
    workflow: [
      { id: 'traffic', label: 'Traffic', icon: 'users' },
      { id: 'web-analysis', label: 'Web Analysis', icon: 'search' },
      { id: 'seo', label: 'SEO', icon: 'seo' },
      { id: 'fb', label: 'Facebook Analysis', icon: 'share' },
      { id: 'ads', label: 'Ads', icon: 'target' },
      { id: 'leadgen', label: 'Lead Generation', icon: 'magnet' },
      { id: 'analytics', label: 'Marketing Analytics', icon: 'chart' },
      { id: 'report', label: 'Report', icon: 'file' },
    ],
  },
  {
    id: 'web-design',
    index: '03',
    title: 'Web Design',
    summary: 'Interfaces built as components, not pictures.',
    description:
      'Design moves from structure to layout to working components, checked on desktop and mobile before it ships. Every screen in the showcase below is real markup.',
    capabilities: [
      'Wireframes and page structure',
      'Design system and components',
      'Responsive layout across breakpoints',
      'Accessible interaction states',
      'Handoff to production code',
    ],
    accent: '#8B7BFF',
    workflow: [
      { id: 'wireframe', label: 'Wireframe', icon: 'grid' },
      { id: 'layout', label: 'Layout', icon: 'layout' },
      { id: 'components', label: 'UI Components', icon: 'blocks' },
      { id: 'desktop', label: 'Desktop Preview', icon: 'monitor' },
      { id: 'mobile', label: 'Mobile Preview', icon: 'smartphone' },
      { id: 'final', label: 'Final Website', icon: 'check' },
    ],
  },
  {
    id: 'wordpress',
    index: '04',
    title: 'WordPress',
    summary: 'A business site wired into the workflow behind it.',
    description:
      'Most WordPress sites stop at the contact form. Here the form submission is the first step of a process that ends with a record and a notification.',
    capabilities: [
      'Theme and template development',
      'Form and enquiry handling',
      'Plugin and performance review',
      'Automation hooks into CRM',
      'Editor training and handover',
    ],
    accent: '#4C8DFF',
    workflow: [
      { id: 'site', label: 'WordPress Website', icon: 'wordpress' },
      { id: 'submit', label: 'Form Submission', icon: 'form' },
      { id: 'lead', label: 'Lead', icon: 'inbox' },
      { id: 'automation', label: 'Automation', icon: 'automation' },
      { id: 'crm', label: 'CRM', icon: 'database' },
      { id: 'email', label: 'Email', icon: 'mail' },
      { id: 'notify', label: 'Notification', icon: 'bell' },
    ],
  },
  {
    id: 'shopify',
    index: '05',
    title: 'Shopify',
    summary: 'Orders that update everything downstream.',
    description:
      'A store generates events all day. Those events should reach customer records, email and reporting without a spreadsheet in the middle.',
    capabilities: [
      'Storefront and theme build',
      'Product and collection structure',
      'Cart and checkout review',
      'Order and customer data sync',
      'Post-purchase email flows',
    ],
    accent: '#2FE8C3',
    workflow: [
      { id: 'customer', label: 'Customer', icon: 'users' },
      { id: 'product', label: 'Product', icon: 'box' },
      { id: 'cart', label: 'Cart', icon: 'cart' },
      { id: 'order', label: 'Order', icon: 'receipt' },
      { id: 'data', label: 'Customer Data', icon: 'database' },
      { id: 'email', label: 'Email', icon: 'mail' },
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
    ],
  },
];

export const serviceOptions = [
  'AI Automation',
  'Digital Marketing',
  'Web Design',
  'WordPress',
  'Shopify',
  'Other / Not Sure',
];
