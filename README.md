# AIDIPTO — Frontend

Dark, technical, motion-led frontend for AIDIPTO (AI Automation · Digital Marketing · Web Development).
Frontend only: no backend, no database, no API keys anywhere in the code.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 (design tokens in `tailwind.config.js`)
- Framer Motion (scroll-linked and presence animation)
- lucide-react + local SVG marks for platform icons

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # tsc -b && vite build
npm run preview  # serve the production build
npm run lint     # tsc --noEmit
```

## Structure

```
src/
  App.tsx                     section composition
  main.tsx                    entry
  index.css                   Tailwind layers + orbital/form primitives
  data/                       all content is data-driven
    services.ts               exactly 5 primary services + workflows
    orbit.ts                  hero orbital nodes + ring config
    projects.ts               portfolio entries and filters
    connectedOperations.ts    one node graph per operation state
    problemSolutions.ts       problem → system → improvement rows
    marketingDemos.ts         dashboard tabs (demo values)
    process.ts, faq.ts, knowledge.ts
  hooks/                      useMediaQuery (incl. reduced motion), useScrolled, useScrollSpy, useSessionState
  lib/assistant.ts            local keyword matching for the assistant (no model call)
  components/
    Header, Hero, OrbitalSystem, OrbitalNode
    StickyServices, ServiceSelector, ServiceWorkflow
    ProblemSolutions, ConnectedOperations, OperationGraph, SystemsThatWork
    AutomationDemo, MarketingSection
    WebDesignShowcase, DevicePreview, ProjectDetails
    Portfolio, PortfolioCard, PortfolioFilter, PortfolioModal
    ProcessTimeline, About, Faq, SmartCTA, ContactForm, Footer
    ai/        AskAidipto, ChatWindow, ChatMessage, ClientInfoCard
    demos/     DemoEcommerce, DemoSeoDashboard, DemoAiWebsite
    ui/        Section, Icon, DemoBadge, Sparkline
```

## Behaviour notes

- **Header** is `position: fixed` and never hides; it only changes background after 24px of scroll.
- **Services** use a tall track with a `position: sticky` panel and `useScroll` progress. No wheel
  handlers, no scroll locking. Below `lg` the sticky behaviour is replaced by a tab strip.
- **Orbital system** keeps rotating when a node is selected — selection only changes state, never
  remounts the rings.
- **Reduced motion** is respected globally in `index.css` and per component through
  `useReducedMotion()`.
- **Assistant** collects details once and keeps them in `localStorage` for the session, so the same
  questions are not repeated. Replies are matched locally from `data/knowledge.ts`.
- **Contact form** and the automation demo are frontend only. The form reports
  "Request prepared successfully" and never claims an email was sent or a CRM updated.

## Data honesty

Every dashboard, storefront, chart and project on the site is a concept or demo build by AIDIPTO and is
labelled `DEMO DATA`, `DEMO PROJECT` or `CONCEPT`. There are no client names, testimonials, revenue
figures, awards or result claims anywhere in the code or content.

## Verification status

A full strict TypeScript pass (`strict`, `noUnusedLocals`, `noUnusedParameters`) was run over `src/`
with library types stubbed, and reported no errors. `npm install` / `npm run build` were not executed
in the authoring environment because it has no registry access — run both locally before deploying.
