import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import StickyServices from './components/StickyServices';
import ProblemSolutions from './components/ProblemSolutions';
import ConnectedOperations from './components/ConnectedOperations';
import SystemsThatWork from './components/SystemsThatWork';
import AutomationDemo from './components/AutomationDemo';
import MarketingSection from './components/MarketingSection';
import WebDesignShowcase from './components/WebDesignShowcase';
import Portfolio from './components/Portfolio';
import ProcessTimeline from './components/ProcessTimeline';
import About from './components/About';
import Faq from './components/Faq';
import ContactForm from './components/ContactForm';
import SmartCTA from './components/SmartCTA';
import Footer from './components/Footer';
import AskAidipto from './components/ai/AskAidipto';
import ScrollCursor from './components/ScrollCursor';

export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <>
      <ScrollCursor />
      <Header />
      <main id="main">
        <Hero onOpenAssistant={() => setAssistantOpen(true)} />
        <StickyServices />
        <ProblemSolutions />
        <ConnectedOperations />
        <SystemsThatWork />
        <AutomationDemo />
        <MarketingSection />
        <WebDesignShowcase />
        <Portfolio />
        <ProcessTimeline />
        <About />
        <Faq />
        <SmartCTA onOpenAssistant={() => setAssistantOpen(true)} />
        <ContactForm />
      </main>
      <Footer />
      <AskAidipto open={assistantOpen} onOpenChange={setAssistantOpen} />
    </>
  );
}
