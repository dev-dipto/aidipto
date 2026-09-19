import {
  Bell,
  Blocks,
  Bot,
  Box,
  BarChart3,
  CheckCircle2,
  Cpu,
  Database,
  FileText,
  Globe,
  GraduationCap,
  LayoutGrid,
  Inbox,
  LayoutPanelTop,
  Magnet,
  Mail,
  Monitor,
  Receipt,
  Search,
  Share2,
  ShoppingCart,
  Smartphone,
  CheckSquare,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/* --- Brand-style marks drawn as simple geometry (not official logo files) --- */

const N8nMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <circle cx="4" cy="12" r="2.4" fill="currentColor" />
    <circle cx="12" cy="6" r="2.4" fill="currentColor" opacity="0.85" />
    <circle cx="12" cy="18" r="2.4" fill="currentColor" opacity="0.85" />
    <circle cx="20" cy="12" r="2.4" fill="currentColor" />
    <path d="M6.4 12h3.2M14.4 7.4 17.8 10M14.4 16.6 17.8 14M12 8.4v7.2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const MakeMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <rect x="3" y="4" width="3" height="16" rx="1.5" fill="currentColor" />
    <path d="M10 4 8 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <path d="M15 4l2 8 2-8" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="19" cy="18" r="2.2" fill="currentColor" />
  </svg>
);

const ZapierMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const OpenAiMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <path
      d="M12 3.2 18.2 6.8v7.2L12 17.6 5.8 14V6.8L12 3.2Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M12 3.2v7.2l6.2 3.6M12 10.4 5.8 14M12 10.4v7.2" stroke="currentColor" strokeWidth="1.1" opacity="0.75" />
    <circle cx="12" cy="20.4" r="1.4" fill="currentColor" />
  </svg>
);

const ShopifyMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <path
      d="M9.3 4.2c-1.5.4-2.4 2-2.8 3.5L4.2 8.3 3 20l9 1.2 1.6-12.5-2.2.6c.1-1.6-.4-4.4-2.1-5.1Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M9.3 4.2c1.2.4 1.6 2.3 1.5 4.1" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
    <path d="M14.4 8.6 21 9.8 19.4 21 12 21.2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const WordPressMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M4.2 9.2 8.4 20M10.6 8.6 14.4 20l2.6-7.4M8.4 8.6h4.4M15.4 8.6h3.4M19.6 12c0 2.2-1.2 4.6-2.6 8"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SeoMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.5" />
    <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M7.8 11.6 10 9l2 2.2 2.4-3.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FormMark = ({ size = 20, ...rest }: IconProps) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true" {...rest}>
    <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 8h8M8 12h8M8 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/**
 * Lucide icons and the local brand marks have slightly different prop types,
 * so the registry stays loose and `Icon` below exposes the strict surface.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = ComponentType<any>;

const registry: Record<string, IconComponent> = {
  n8n: N8nMark,
  make: MakeMark,
  zapier: ZapierMark,
  openai: OpenAiMark,
  shopify: ShopifyMark,
  wordpress: WordPressMark,
  seo: SeoMark,
  form: FormMark,
  agent: Bot,
  education: GraduationCap,
  cart: ShoppingCart,
  analytics: TrendingUp,
  automation: Workflow,
  globe: Globe,
  inbox: Inbox,
  cpu: Cpu,
  check: CheckCircle2,
  database: Database,
  mail: Mail,
  bell: Bell,
  users: Users,
  search: Search,
  share: Share2,
  target: Target,
  magnet: Magnet,
  chart: BarChart3,
  file: FileText,
  grid: LayoutGrid,
  layout: LayoutPanelTop,
  blocks: Blocks,
  monitor: Monitor,
  smartphone: Smartphone,
  box: Box,
  receipt: Receipt,
  task: CheckSquare,
};

export function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Component = registry[name] ?? Workflow;
  return <Component size={size} className={className} aria-hidden="true" />;
}

export default Icon;
