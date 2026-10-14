import Section from './Section.jsx';

export default function Skills({ skills }) {
  return (
    <Section id="skills" title="Compétences">
      <div className="grid">
        {skills.map((group) => (
          <div key={group.category} className="card">
            <h3>{group.category}</h3>
            <ul className="tags">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
