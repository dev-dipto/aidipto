import Section from './ui/Section';

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title="A small studio that builds connected systems."
      lede="AIDIPTO works on automation, marketing and web development as one practice, because in most businesses those three are the same problem seen from different sides."
    >
      <div className="max-w-2xl">
        <p className="text-[15px] leading-relaxed text-muted">
          The work starts from what a business already does every day — the forms people check, the
          spreadsheets people update, the messages that get answered twice. Those steps get written down,
          and the ones that do not need a person get built into a workflow.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-muted">
          What you see on this site is the studio&rsquo;s own work: demos, concepts and interfaces built to show
          method. Client material is not published here.
        </p>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-hairline pt-6">
          <div>
            <dt className="section-label">Based in</dt>
            <dd className="mt-1.5 text-[15px]">Bangladesh, working remotely</dd>
          </div>
          <div>
            <dt className="section-label">Focus</dt>
            <dd className="mt-1.5 text-[15px]">Automation, marketing, web</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}

export default About;
