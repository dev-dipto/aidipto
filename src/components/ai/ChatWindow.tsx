import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { RefreshCw, Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ClientInfoCard from './ClientInfoCard';
import { answerFor, createId, emptyLead, greetingFor } from '../../lib/assistant';
import type { ChatMessageItem, LeadProfile } from '../../lib/assistant';
import { starterPrompts } from '../../data/knowledge';
import { serviceOptions } from '../../data/services';
import { useSessionState } from '../../hooks/useSessionState';

type Stage = 'intake' | 'review' | 'chat';

interface ChatWindowProps {
  onClose: () => void;
}

const budgets = ['Not decided', 'Under ৳ 50k', '৳ 50k – 150k', '৳ 150k – 400k', 'Above ৳ 400k'];
const timelines = ['Not decided', 'Within 2 weeks', '2–6 weeks', '1–3 months', 'Later this year'];

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [lead, setLead] = useSessionState<LeadProfile>('aidipto.lead', emptyLead);
  const [stage, setStage] = useSessionState<Stage>('aidipto.stage', 'intake');
  const [messages, setMessages] = useSessionState<ChatMessageItem[]>('aidipto.messages', []);
  const [draft, setDraft] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof LeadProfile, string>>>({});
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, stage]);

  useEffect(() => {
    if (stage === 'chat') inputRef.current?.focus();
  }, [stage]);

  const update = (field: keyof LeadProfile) => (event: { target: { value: string } }) => {
    setLead((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const submitIntake = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: Partial<Record<keyof LeadProfile, string>> = {};
    if (!lead.name.trim()) next.name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) next.email = 'Check the email format';
    if (!lead.phone.trim()) next.phone = 'Required';
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setStage('review');
  };

  const startChat = () => {
    setStage('chat');
    setMessages((prev) =>
      prev.length > 0
        ? prev
        : [{ id: createId(), role: 'assistant', text: greetingFor(lead), suggestions: starterPrompts }],
    );
  };

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = answerFor(trimmed);
    setMessages((prev) => [
      ...prev,
      { id: createId(), role: 'user', text: trimmed },
      { id: createId(), role: 'assistant', text: reply.text, suggestions: reply.suggestions },
    ]);
    setDraft('');
  };

  const restart = () => {
    setMessages([]);
    setStage('intake');
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <header className="flex items-center gap-3 border-b border-hairline px-4 py-3">
        <span className="relative grid h-8 w-8 place-items-center rounded-lg border border-azure/40 bg-azure/10">
          <span className="h-1.5 w-1.5 rounded-full bg-azure" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[14px] font-medium leading-tight">AIDIPTO AI</p>
          <p className="flex items-center gap-1.5 font-mono text-[10px] text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
            Online
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {stage === 'chat' && (
            <button
              type="button"
              onClick={restart}
              className="grid h-8 w-8 place-items-center rounded-md text-muted hover:text-mist"
              aria-label="Start over"
            >
              <RefreshCw size={15} aria-hidden="true" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-md text-muted hover:text-mist"
            aria-label="Close assistant"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4">
        {stage === 'intake' && (
          <form onSubmit={submitIntake} noValidate className="grid gap-3">
            <p className="text-[13px] leading-relaxed text-muted">
              A few details first, so the conversation starts with context instead of questions.
            </p>

            <ChatField id="chat-name" label="Name" error={errors.name}>
              <input id="chat-name" className="input py-2.5 text-[13.5px]" value={lead.name} onChange={update('name')} autoComplete="name" />
            </ChatField>
            <ChatField id="chat-email" label="Email" error={errors.email}>
              <input id="chat-email" type="email" className="input py-2.5 text-[13.5px]" value={lead.email} onChange={update('email')} autoComplete="email" />
            </ChatField>
            <ChatField id="chat-phone" label="Phone / WhatsApp" error={errors.phone}>
              <input id="chat-phone" type="tel" className="input py-2.5 text-[13.5px]" value={lead.phone} onChange={update('phone')} autoComplete="tel" />
            </ChatField>

            <details className="rounded-lg border border-hairline bg-panel/60 px-3 py-2.5">
              <summary className="cursor-pointer text-[12.5px] text-muted">Add project context (optional)</summary>
              <div className="mt-3 grid gap-3">
                <ChatField id="chat-company" label="Company">
                  <input id="chat-company" className="input py-2.5 text-[13.5px]" value={lead.company} onChange={update('company')} />
                </ChatField>
                <ChatField id="chat-website" label="Website">
                  <input id="chat-website" className="input py-2.5 text-[13.5px]" value={lead.website} onChange={update('website')} placeholder="example.com" />
                </ChatField>
                <ChatField id="chat-business" label="Business type">
                  <input id="chat-business" className="input py-2.5 text-[13.5px]" value={lead.businessType} onChange={update('businessType')} />
                </ChatField>
                <ChatField id="chat-service" label="Interested service">
                  <select id="chat-service" className="input py-2.5 text-[13.5px]" value={lead.service} onChange={update('service')}>
                    <option value="">Select</option>
                    {serviceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </ChatField>
                <ChatField id="chat-requirement" label="Project requirement">
                  <textarea id="chat-requirement" rows={3} className="input py-2.5 text-[13.5px]" value={lead.requirement} onChange={update('requirement')} />
                </ChatField>
                <ChatField id="chat-budget" label="Budget">
                  <select id="chat-budget" className="input py-2.5 text-[13.5px]" value={lead.budget} onChange={update('budget')}>
                    <option value="">Select</option>
                    {budgets.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </ChatField>
                <ChatField id="chat-timeline" label="Timeline">
                  <select id="chat-timeline" className="input py-2.5 text-[13.5px]" value={lead.timeline} onChange={update('timeline')}>
                    <option value="">Select</option>
                    {timelines.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </ChatField>
              </div>
            </details>

            <button type="submit" className="btn-primary mt-1 w-full">
              Save details
            </button>
            <p className="font-mono text-[10px] leading-relaxed text-faint">
              Stored in this browser only, for this session. Nothing is transmitted from this page.
            </p>
          </form>
        )}

        {stage === 'review' && (
          <ClientInfoCard lead={lead} onEdit={() => setStage('intake')} onContinue={startChat} />
        )}

        {stage === 'chat' && (
          <div className="grid gap-4">
            <ClientInfoCard lead={lead} onEdit={() => setStage('intake')} />
            <div className="grid gap-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} onSuggestion={send} />
              ))}
            </div>
          </div>
        )}
      </div>

      {stage === 'chat' && (
        <form
          className="flex items-center gap-2 border-t border-hairline px-3 py-3"
          onSubmit={(event) => {
            event.preventDefault();
            send(draft);
          }}
        >
          <label htmlFor="chat-input" className="sr-only">
            Message AIDIPTO AI
          </label>
          <input
            id="chat-input"
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask about services, process or scope"
            className="input py-2.5 text-[13.5px]"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="btn-primary h-[42px] shrink-0 px-3.5 py-0 disabled:opacity-50"
            aria-label="Send message"
          >
            <Send size={15} aria-hidden="true" />
          </button>
        </form>
      )}
    </div>
  );
}

function ChatField({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[12.5px] text-muted">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-[11.5px] text-amberline">{error}</p>}
    </div>
  );
}

export default ChatWindow;
