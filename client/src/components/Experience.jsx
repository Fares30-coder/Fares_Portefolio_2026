import Section from './Section.jsx';

export default function Experience({ experiences }) {
  return (
    <Section id="experience" title="Expériences">
      <ol className="timeline">
        {experiences.map((exp) => (
          <li key={`${exp.company}-${exp.period}`}>
            <span className="period">{exp.period}</span>
            <h3>{exp.role} · <span className="muted">{exp.company}</span></h3>
            <ul className="bullets">
              {exp.description.map((d) => <li key={d}>{d}</li>)}
            </ul>
            <ul className="tags">
              {exp.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
