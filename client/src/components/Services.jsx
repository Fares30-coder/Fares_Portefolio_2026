import Section from './Section.jsx';

export default function Services({ services = [] }) {
  if (services.length === 0) return null;

  return (
    <Section id="services" title="Freelance">
      <p className="lead">
        Besoin d'un développeur pour un projet ponctuel ? Je prends des missions au forfait ou en régie,
        à Lille et à distance.
      </p>
      <div className="grid">
        {services.map((s, i) => (
          <article key={s.title} className="card service">
            <span className="service-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
      <div className="hero-actions">
        <a className="btn primary" href="#contact">Parler de votre projet</a>
      </div>
    </Section>
  );
}
