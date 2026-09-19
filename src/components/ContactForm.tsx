import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Check, Copy, Mail, Send } from 'lucide-react';
import Section from './ui/Section';
import { serviceOptions } from '../data/services';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  details: string;
}

const empty: FormState = { name: '', email: '', phone: '', company: '', service: '', details: '' };

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = 'Add a name so the reply is addressed to someone.';
  if (!values.email.trim()) errors.email = 'An email address is needed to reply.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Check the email format.';
  if (!values.phone.trim()) errors.phone = 'Add a WhatsApp or phone number.';
  if (!values.service) errors.service = 'Pick the closest service.';
  if (values.details.trim().length < 12) errors.details = 'A sentence or two about the project helps.';
  return errors;
}

/**
 * Frontend only. The form assembles a request and hands it to the visitor's
 * own mail or messaging app — nothing is transmitted from this page.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [prepared, setPrepared] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof FormState) => (event: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setPrepared(false);
  };

  const summary = `Name: ${values.name}
Email: ${values.email}
WhatsApp / Phone: ${values.phone}
Company: ${values.company || '—'}
Service needed: ${values.service}

Project details:
${values.details}`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = document.getElementById(`field-${Object.keys(nextErrors)[0]}`);
      first?.focus();
      return;
    }
    setPrepared(true);
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const mailtoHref = `mailto:info@aidipto.com?subject=${encodeURIComponent(
    `Project request — ${values.service || 'General'}`,
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <Section
      id="contact"
      label="Contact"
      title="Tell us what is breaking."
      lede="Fill this in and it becomes a structured request you can send from your own email or WhatsApp. Nothing is transmitted from this page."
    >
      <div className="max-w-2xl">
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Name" error={errors.name}>
              <input
                id="field-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={update('name')}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'error-name' : undefined}
                className="input"
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="field-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={update('email')}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'error-email' : undefined}
                className="input"
              />
            </Field>
            <Field id="phone" label="WhatsApp / Phone" error={errors.phone}>
              <input
                id="field-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={values.phone}
                onChange={update('phone')}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'error-phone' : undefined}
                className="input"
              />
            </Field>
            <Field id="company" label="Company" hint="Optional">
              <input
                id="field-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={update('company')}
                className="input"
              />
            </Field>
          </div>

          <Field id="service" label="Service needed" error={errors.service}>
            <select
              id="field-service"
              name="service"
              value={values.service}
              onChange={update('service')}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? 'error-service' : undefined}
              className="input"
            >
              <option value="">Select a service</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>

          <Field id="details" label="Project details" error={errors.details}>
            <textarea
              id="field-details"
              name="details"
              rows={5}
              value={values.details}
              onChange={update('details')}
              aria-invalid={Boolean(errors.details)}
              aria-describedby={errors.details ? 'error-details' : undefined}
              className="input resize-y"
              placeholder="What happens today, and what you want it to do instead."
            />
          </Field>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="btn-primary">
              <Send size={16} aria-hidden="true" />
              Prepare request
            </button>
            {prepared && (
              <>
                <a href={mailtoHref} className="btn-ghost">
                  <Mail size={16} aria-hidden="true" />
                  Open in email
                </a>
                <button type="button" onClick={copySummary} className="btn-ghost">
                  {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy request'}
                </button>
              </>
            )}
          </div>

          <p role="status" aria-live="polite" className="min-h-[24px] text-[13.5px]">
            {prepared && (
              <span className="text-signal">
                Request prepared successfully. Send it with the email button, or copy it into WhatsApp.
              </span>
            )}
          </p>

          <p className="border-t border-hairline pt-5 text-[13px] leading-relaxed text-faint">
            The form does not send email, create a CRM record or trigger a workflow. It formats your
            request so you can send it yourself from a channel you control.
          </p>
        </form>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 flex items-baseline gap-2 text-[13.5px] text-mist">
        {label}
        {hint && <span className="font-mono text-[10px] text-faint">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`error-${id}`} className="mt-1.5 text-[12.5px] text-amberline">
          {error}
        </p>
      )}
    </div>
  );
}

export default ContactForm;
