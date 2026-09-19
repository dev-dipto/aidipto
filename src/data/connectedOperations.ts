export interface OperationNode {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: 'source' | 'process' | 'output';
}

export interface OperationEdge {
  from: string;
  to: string;
}

export interface ConnectedOperation {
  id: string;
  index: string;
  title: string;
  headline: string;
  body: string;
  metrics: { label: string; value: string }[];
  nodes: OperationNode[];
  edges: OperationEdge[];
}

/**
 * Each state carries its own node graph — no shared visual between states.
 * Coordinates are in a 0-100 viewBox space.
 */
export const connectedOperations: ConnectedOperation[] = [
  {
    id: 'ai-automation',
    index: '01',
    title: 'AI Automation',
    headline: 'One path from enquiry to record',
    body: 'An enquiry is captured, read by a model, scored, then written to the CRM with a notification attached. Nothing sits in an inbox waiting to be noticed.',
    metrics: [
      { label: 'Manual steps removed', value: 'Illustrative' },
      { label: 'Path', value: 'Form → CRM' },
    ],
    nodes: [
      { id: 'form', label: 'Form', x: 10, y: 50, kind: 'source' },
      { id: 'ai', label: 'AI', x: 38, y: 24, kind: 'process' },
      { id: 'score', label: 'Score', x: 38, y: 76, kind: 'process' },
      { id: 'crm', label: 'CRM', x: 68, y: 50, kind: 'process' },
      { id: 'alert', label: 'Alert', x: 92, y: 26, kind: 'output' },
      { id: 'email', label: 'Email', x: 92, y: 74, kind: 'output' },
    ],
    edges: [
      { from: 'form', to: 'ai' },
      { from: 'form', to: 'score' },
      { from: 'ai', to: 'crm' },
      { from: 'score', to: 'crm' },
      { from: 'crm', to: 'alert' },
      { from: 'crm', to: 'email' },
    ],
  },
  {
    id: 'digital-marketing',
    index: '02',
    title: 'Digital Marketing',
    headline: 'Channels feeding one report',
    body: 'Search, social and paid traffic are tracked against the same events, so the report describes one funnel instead of three disconnected exports.',
    metrics: [
      { label: 'Channels', value: 'Search · Social · Paid' },
      { label: 'Output', value: 'Single report' },
    ],
    nodes: [
      { id: 'seo', label: 'SEO', x: 10, y: 20, kind: 'source' },
      { id: 'social', label: 'Social', x: 10, y: 50, kind: 'source' },
      { id: 'ads', label: 'Ads', x: 10, y: 80, kind: 'source' },
      { id: 'track', label: 'Tracking', x: 45, y: 50, kind: 'process' },
      { id: 'funnel', label: 'Funnel', x: 72, y: 50, kind: 'process' },
      { id: 'report', label: 'Report', x: 93, y: 50, kind: 'output' },
    ],
    edges: [
      { from: 'seo', to: 'track' },
      { from: 'social', to: 'track' },
      { from: 'ads', to: 'track' },
      { from: 'track', to: 'funnel' },
      { from: 'funnel', to: 'report' },
    ],
  },
  {
    id: 'web-design',
    index: '03',
    title: 'Web Design',
    headline: 'Structure before surface',
    body: 'A wireframe becomes a component library, and the library renders every breakpoint. The same component is the desktop view and the mobile view.',
    metrics: [
      { label: 'Breakpoints', value: '390 → 1440' },
      { label: 'Source', value: 'One component set' },
    ],
    nodes: [
      { id: 'wire', label: 'Wireframe', x: 10, y: 50, kind: 'source' },
      { id: 'system', label: 'System', x: 36, y: 50, kind: 'process' },
      { id: 'desktop', label: 'Desktop', x: 68, y: 18, kind: 'output' },
      { id: 'tablet', label: 'Tablet', x: 68, y: 50, kind: 'output' },
      { id: 'mobile', label: 'Mobile', x: 68, y: 82, kind: 'output' },
      { id: 'ship', label: 'Ship', x: 92, y: 50, kind: 'output' },
    ],
    edges: [
      { from: 'wire', to: 'system' },
      { from: 'system', to: 'desktop' },
      { from: 'system', to: 'tablet' },
      { from: 'system', to: 'mobile' },
      { from: 'desktop', to: 'ship' },
      { from: 'mobile', to: 'ship' },
    ],
  },
  {
    id: 'wordpress',
    index: '04',
    title: 'WordPress',
    headline: 'The form is step one, not the end',
    body: 'A submission triggers the workflow instead of landing in a shared mailbox. The record, the reply and the alert are created from the same event.',
    metrics: [
      { label: 'Trigger', value: 'Form submission' },
      { label: 'Ends at', value: 'Record + alert' },
    ],
    nodes: [
      { id: 'wp', label: 'WordPress', x: 10, y: 50, kind: 'source' },
      { id: 'hook', label: 'Webhook', x: 34, y: 50, kind: 'process' },
      { id: 'flow', label: 'Workflow', x: 58, y: 28, kind: 'process' },
      { id: 'crm', label: 'CRM', x: 58, y: 72, kind: 'process' },
      { id: 'mail', label: 'Email', x: 88, y: 32, kind: 'output' },
      { id: 'alert', label: 'Alert', x: 88, y: 68, kind: 'output' },
    ],
    edges: [
      { from: 'wp', to: 'hook' },
      { from: 'hook', to: 'flow' },
      { from: 'hook', to: 'crm' },
      { from: 'flow', to: 'mail' },
      { from: 'crm', to: 'alert' },
    ],
  },
  {
    id: 'shopify',
    index: '05',
    title: 'Shopify',
    headline: 'Orders that update everything',
    body: 'A placed order writes to customer data, triggers the post-purchase email and lands in reporting — from one event rather than three manual updates.',
    metrics: [
      { label: 'Event', value: 'Order placed' },
      { label: 'Updates', value: 'Data · Email · Report' },
    ],
    nodes: [
      { id: 'cart', label: 'Cart', x: 10, y: 30, kind: 'source' },
      { id: 'order', label: 'Order', x: 34, y: 55, kind: 'source' },
      { id: 'sync', label: 'Sync', x: 58, y: 55, kind: 'process' },
      { id: 'data', label: 'Customer', x: 86, y: 22, kind: 'output' },
      { id: 'email', label: 'Email', x: 86, y: 55, kind: 'output' },
      { id: 'report', label: 'Analytics', x: 86, y: 86, kind: 'output' },
    ],
    edges: [
      { from: 'cart', to: 'order' },
      { from: 'order', to: 'sync' },
      { from: 'sync', to: 'data' },
      { from: 'sync', to: 'email' },
      { from: 'sync', to: 'report' },
    ],
  },
];
