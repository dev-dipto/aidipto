export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    id: 'start',
    question: 'How does a project start?',
    answer:
      'You send a request with what you need and where things currently break. We reply with a written scope: what will be built, what it connects to, and what stays manual.',
  },
  {
    id: 'existing-site',
    question: 'Can you work with a site that already exists?',
    answer:
      'Yes. Reviewing what is already there is the first step. Rebuilding is only proposed when the existing structure blocks what you want to do.',
  },
  {
    id: 'automation-safety',
    question: 'What happens if an automation fails?',
    answer:
      'Workflows are built with error paths and notifications, so a failed step is visible rather than silent. Nothing is left in a state where an enquiry simply disappears.',
  },
  {
    id: 'demos',
    question: 'Are the numbers in the demos real?',
    answer:
      'No. Every dashboard, chart and store on this site is marked as demo data and exists to show interface structure. No client results are shown anywhere.',
  },
  {
    id: 'ai-chat',
    question: 'What does the AIDIPTO AI assistant do?',
    answer:
      'It collects your details and project context in one place, then continues the conversation with that context available. Information stays in your browser for the session.',
  },
  {
    id: 'stack',
    question: 'Which tools do you build with?',
    answer:
      'React and TypeScript on the frontend; n8n, Make or Zapier for workflow orchestration; WordPress or Shopify where the platform fits the business.',
  },
  {
    id: 'timeline',
    question: 'How long does a build take?',
    answer:
      'It depends on scope, which is why the scope is written first. A single workflow is a short piece of work; a site plus connected operations is not.',
  },
];
