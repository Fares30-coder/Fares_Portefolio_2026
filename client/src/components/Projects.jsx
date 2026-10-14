import Section from './Section.jsx';

export default function Projects({ projects }) {
  return (
    <Section id="projects" title="Projets">
      <div className="grid">
        {projects.map((p) => (
          <article key={p.name} className="card project">
            <h3>{p.name}</h3>
            {p.context && <span className="period">{p.context}</span>}
            <p>{p.description}</p>
            {p.highlights?.length > 0 && (
              <ul className="bullets">
                {p.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            )}
            <ul className="tags">
              {p.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            <div className="project-links">
              {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code →</a>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Démo →</a>}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
