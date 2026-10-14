import Section from './Section.jsx';

export default function Education({ education }) {
  return (
    <Section id="education" title="Formation">
      <ol className="timeline">
        {education.map((e) => (
          <li key={`${e.school}-${e.degree}`}>
            <span className="period">{e.period}</span>
            <h3>{e.degree} · <span className="muted">{e.school}</span></h3>
          </li>
        ))}
      </ol>
    </Section>
  );
}
