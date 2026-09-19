export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  answer: string;
  followUps?: string[];
}

/**
 * Local knowledge used by the AIDIPTO AI panel.
 * There is no model call and no API key in this frontend — replies are matched
 * from this list, and anything unmatched is handed to a human contact route.
 */
export const knowledge: KnowledgeEntry[] = [
  {
    id: 'services',
    keywords: ['service', 'offer', 'do you', 'what do you do', 'help with'],
    answer:
      'Five things: AI Automation, Digital Marketing, Web Design, WordPress and Shopify. Everything else — SEO, CRM setup, chatbots — sits inside one of those five.',
    followUps: ['Tell me about AI Automation', 'What does a web design project include?'],
  },
  {
    id: 'ai-automation',
    keywords: ['automation', 'automate', 'workflow', 'n8n', 'make', 'zapier', 'crm'],
    answer:
      'Automation work starts from the path an enquiry or order already takes, then removes the manual copying between steps. Typical stack: n8n, Make or Zapier, plus a language model where classification is needed.',
    followUps: ['Can you connect my existing CRM?', 'How long does a workflow take to build?'],
  },
  {
    id: 'marketing',
    keywords: ['marketing', 'seo', 'ads', 'facebook', 'campaign', 'traffic'],
    answer:
      'Marketing work covers site and funnel analysis, search structure, paid campaign setup and the reporting layer that ties them together. The dashboard section on this page shows the reporting format with demo data.',
    followUps: ['What does SEO work include?', 'Do you run ad campaigns?'],
  },
  {
    id: 'web',
    keywords: ['web design', 'website', 'design', 'ui', 'ux', 'landing'],
    answer:
      'Sites are built as components in React or as themes in WordPress or Shopify, depending on who maintains the content afterwards. Every layout is checked from 390px up to 1440px.',
    followUps: ['Can you redesign an existing site?', 'Do you build in WordPress?'],
  },
  {
    id: 'wordpress',
    keywords: ['wordpress', 'wp', 'elementor', 'plugin'],
    answer:
      'WordPress work covers theme and template development, form handling, performance review and the automation hooks that move a submission into a CRM.',
  },
  {
    id: 'shopify',
    keywords: ['shopify', 'store', 'ecommerce', 'e-commerce', 'product', 'order'],
    answer:
      'Shopify work covers storefront build, product structure, checkout review and connecting order events to customer data, email and reporting.',
  },
  {
    id: 'pricing',
    keywords: ['price', 'pricing', 'cost', 'budget', 'how much', 'rate'],
    answer:
      'Pricing depends on scope, so there is no fixed list here. Share the budget range and requirement and you will get a written scope with a figure attached rather than a guess.',
    followUps: ['I want to share my project details'],
  },
  {
    id: 'timeline',
    keywords: ['timeline', 'how long', 'deadline', 'urgent', 'delivery'],
    answer:
      'A single workflow is a short piece of work. A site plus connected operations is longer. Once the scope is written you get a schedule with it.',
  },
  {
    id: 'contact',
    keywords: ['contact', 'call', 'whatsapp', 'phone', 'email', 'talk', 'human'],
    answer:
      'Direct routes: info@aidipto.com, or +8801898880952 on WhatsApp. The contact form on this page prepares the same request.',
  },
  {
    id: 'process',
    keywords: ['process', 'how do you work', 'steps', 'start'],
    answer:
      'Four stages: a written scope, a build, a review against the scope, then handover with documentation. You see the working version before handover, not after.',
  },
  {
    id: 'data',
    keywords: ['demo data', 'real', 'fake', 'client', 'case study', 'result'],
    answer:
      'Every number, store and dashboard on this site is demo data, marked as such. No client names, revenue figures or results are published here.',
  },
];

export const fallbackAnswer =
  'That one is better answered directly rather than guessed at. Send it through the contact form or to info@aidipto.com and you will get a specific reply.';

export const starterPrompts = [
  'What services do you offer?',
  'How does automation work?',
  'What does a project cost?',
  'How do I get started?',
];
