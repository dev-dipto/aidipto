export interface Metric {
  label: string;
  value: string;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
}

export interface MarketingTab {
  id: string;
  label: string;
  caption: string;
  metrics: Metric[];
  series: number[];
  rows?: { name: string; a: string; b: string }[];
  rowHeads?: [string, string, string];
}

/** All values below are placeholder demo data used to show interface structure. */
export const marketingTabs: MarketingTab[] = [
  {
    id: 'web-analysis',
    label: 'Web Analysis',
    caption: 'Sessions and engagement across the last twelve reporting periods.',
    metrics: [
      { label: 'Sessions', value: '18,420', delta: '+6.2%', trend: 'up' },
      { label: 'Avg. duration', value: '2m 14s', delta: '+11s', trend: 'up' },
      { label: 'Bounce', value: '41.8%', delta: '-2.1%', trend: 'down' },
      { label: 'Pages / session', value: '3.1', delta: '+0.2', trend: 'up' },
    ],
    series: [32, 38, 35, 44, 41, 52, 49, 58, 55, 63, 60, 71],
    rowHeads: ['Landing page', 'Sessions', 'Engaged'],
    rows: [
      { name: '/services', a: '4,210', b: '62%' },
      { name: '/projects', a: '3,105', b: '58%' },
      { name: '/contact', a: '1,940', b: '71%' },
      { name: '/about', a: '1,120', b: '44%' },
    ],
  },
  {
    id: 'seo',
    label: 'SEO',
    caption: 'Ranking distribution and indexation health.',
    metrics: [
      { label: 'Tracked keywords', value: '312', delta: '+24', trend: 'up' },
      { label: 'Top 10', value: '48', delta: '+5', trend: 'up' },
      { label: 'Indexed pages', value: '96', delta: '+3', trend: 'up' },
      { label: 'Avg. position', value: '14.6', delta: '-1.8', trend: 'down' },
    ],
    series: [12, 15, 14, 19, 22, 21, 26, 29, 31, 34, 38, 41],
    rowHeads: ['Keyword group', 'Volume', 'Position'],
    rows: [
      { name: 'ai automation agency', a: '1,300', b: '8' },
      { name: 'shopify automation', a: '880', b: '12' },
      { name: 'wordpress lead form', a: '540', b: '6' },
      { name: 'crm workflow setup', a: '420', b: '17' },
    ],
  },
  {
    id: 'facebook',
    label: 'Facebook Analysis',
    caption: 'Page activity and audience response by period.',
    metrics: [
      { label: 'Reach', value: '74,300', delta: '+9.4%', trend: 'up' },
      { label: 'Engagements', value: '5,120', delta: '+3.1%', trend: 'up' },
      { label: 'Link clicks', value: '1,860', delta: '-1.2%', trend: 'down' },
      { label: 'Followers', value: '8,940', delta: '+212', trend: 'up' },
    ],
    series: [40, 44, 39, 47, 52, 48, 56, 61, 57, 64, 69, 66],
    rowHeads: ['Post type', 'Reach', 'Engagement'],
    rows: [
      { name: 'Workflow walkthrough', a: '22,400', b: '4.8%' },
      { name: 'Before / after build', a: '18,100', b: '5.6%' },
      { name: 'Short explainer', a: '15,700', b: '3.2%' },
      { name: 'Client-free case note', a: '9,300', b: '2.4%' },
    ],
  },
  {
    id: 'ads',
    label: 'Ads',
    caption: 'Delivery and cost indicators for active placements.',
    metrics: [
      { label: 'Impressions', value: '312,600', delta: '+12%', trend: 'up' },
      { label: 'CTR', value: '2.14%', delta: '+0.18', trend: 'up' },
      { label: 'CPC', value: '৳ 18.40', delta: '-৳ 1.20', trend: 'down' },
      { label: 'Conversions', value: '284', delta: '+31', trend: 'up' },
    ],
    series: [18, 24, 29, 27, 35, 41, 38, 46, 52, 49, 58, 62],
    rowHeads: ['Placement', 'Spend', 'Conversions'],
    rows: [
      { name: 'Feed — automation offer', a: '৳ 24,800', b: '112' },
      { name: 'Reels — short demo', a: '৳ 16,200', b: '78' },
      { name: 'Search — brand', a: '৳ 9,400', b: '61' },
      { name: 'Retargeting', a: '৳ 6,100', b: '33' },
    ],
  },
  {
    id: 'campaign',
    label: 'Campaign Analysis',
    caption: 'Stage-by-stage movement through the current funnel.',
    metrics: [
      { label: 'Entered funnel', value: '6,480' },
      { label: 'Qualified', value: '812' },
      { label: 'Conversations', value: '246' },
      { label: 'Closed stage', value: '58' },
    ],
    series: [64, 58, 51, 44, 39, 33, 28, 24, 19, 16, 12, 9],
    rowHeads: ['Stage', 'Entered', 'Continued'],
    rows: [
      { name: 'Awareness', a: '6,480', b: '38%' },
      { name: 'Consideration', a: '2,460', b: '33%' },
      { name: 'Enquiry', a: '812', b: '30%' },
      { name: 'Proposal', a: '246', b: '24%' },
    ],
  },
  {
    id: 'lead-generation',
    label: 'Lead Generation',
    caption: 'Where enquiries arrive from and how quickly they are handled.',
    metrics: [
      { label: 'Leads', value: '418', delta: '+42', trend: 'up' },
      { label: 'Qualified', value: '167', delta: '+19', trend: 'up' },
      { label: 'First response', value: '4m 30s', delta: '-2m', trend: 'down' },
      { label: 'Auto-routed', value: '92%', delta: '+6%', trend: 'up' },
    ],
    series: [8, 12, 11, 17, 21, 19, 26, 30, 28, 36, 39, 44],
    rowHeads: ['Source', 'Leads', 'Qualified'],
    rows: [
      { name: 'Website form', a: '186', b: '84' },
      { name: 'WhatsApp', a: '112', b: '47' },
      { name: 'Paid social', a: '78', b: '24' },
      { name: 'Referral', a: '42', b: '12' },
    ],
  },
  {
    id: 'marketing-analytics',
    label: 'Marketing Analytics',
    caption: 'Combined channel view used for the monthly report.',
    metrics: [
      { label: 'Tracked events', value: '124k' },
      { label: 'Channels', value: '5' },
      { label: 'Reports scheduled', value: 'Weekly' },
      { label: 'Data gaps', value: '2 flagged' },
    ],
    series: [22, 28, 31, 36, 34, 42, 47, 45, 53, 58, 61, 68],
    rowHeads: ['Channel', 'Sessions', 'Share'],
    rows: [
      { name: 'Organic search', a: '7,420', b: '40%' },
      { name: 'Paid social', a: '4,860', b: '26%' },
      { name: 'Direct', a: '3,240', b: '18%' },
      { name: 'Referral', a: '2,900', b: '16%' },
    ],
  },
];
