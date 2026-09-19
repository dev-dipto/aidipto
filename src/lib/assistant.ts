import { fallbackAnswer, knowledge } from '../data/knowledge';

export interface LeadProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  businessType: string;
  service: string;
  requirement: string;
  budget: string;
  timeline: string;
}

export const emptyLead: LeadProfile = {
  name: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  businessType: '',
  service: '',
  requirement: '',
  budget: '',
  timeline: '',
};

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
}

export function createId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Keyword match against the local knowledge list. There is no model call and
 * no API key in this frontend; unmatched questions are routed to a person.
 */
export function answerFor(question: string): { text: string; suggestions?: string[] } {
  const normalised = question.toLowerCase();
  let best: { score: number; entry: (typeof knowledge)[number] } | null = null;

  for (const entry of knowledge) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalised.includes(keyword)) score += keyword.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { score, entry };
  }

  if (!best) return { text: fallbackAnswer };
  return { text: best.entry.answer, suggestions: best.entry.followUps };
}

/** The opening line uses what the visitor already gave, so nothing is asked twice. */
export function greetingFor(lead: LeadProfile): string {
  const firstName = lead.name.trim().split(/\s+/)[0];
  const parts: string[] = [
    firstName
      ? `Hi ${firstName} — your details are saved for this session.`
      : 'Your details are saved for this session.',
  ];

  const context: string[] = [];
  if (lead.service) context.push(`interested in ${lead.service}`);
  if (lead.businessType) context.push(`business type: ${lead.businessType}`);
  if (lead.budget) context.push(`budget: ${lead.budget}`);
  if (lead.timeline) context.push(`timeline: ${lead.timeline}`);

  if (context.length > 0) parts.push(`I already have ${context.join(', ')}, so I will not ask again.`);
  parts.push('Ask anything about the services, the process, or what a build would involve.');
  return parts.join(' ');
}

export function leadSummary(lead: LeadProfile): string {
  return [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone / WhatsApp: ${lead.phone}`,
    `Company: ${lead.company || '—'}`,
    `Website: ${lead.website || '—'}`,
    `Business type: ${lead.businessType || '—'}`,
    `Service needed: ${lead.service || '—'}`,
    `Requirement: ${lead.requirement || '—'}`,
    `Budget: ${lead.budget || '—'}`,
    `Timeline: ${lead.timeline || '—'}`,
  ].join('\n');
}
