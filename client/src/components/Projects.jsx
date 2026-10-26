import Section from './Section.jsx';

// Visuel en tête de carte : la capture du projet si elle existe (champ "image" du JSON,
// ex. "/projects/area.png" dans client/public), sinon une couverture générée.
function ProjectVisual({ project, index }) {
  if (project.image) {
    return (
      <img
        className="project-visual"
        src={project.image}
        alt={`Aperçu du projet ${project.name}`}
        loading="lazy"
      />
    );
  }

  const varName = project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^[^a-z]+/, '');
  return (
    <div className="project-visual project-cover" data-variant={index % 3} aria-hidden="true">
      <span className="cover-dots"><i /><i /><i /></span>
      <pre className="cover-code">
        <span className="kw">const</span> {varName || 'projet'} = {'{'}{'\n'}
        {'  '}stack: [{project.stack.slice(0, 2).map((s, i) => (
          <span key={s}>{i > 0 && ', '}<span className="str">'{s}'</span></span>
        ))}],{'\n'}
        {'}'};
      </pre>
    </div>
  );
}

export default function Projects({ projects }) {
  return (
    <Section id="projects" title="Projets">
      <div className="grid">
        {projects.map((p, i) => (
          <article key={p.name} className="card project">
            <ProjectVisual project={p} index={i} />
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
