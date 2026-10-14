export default function Hero({ profile }) {
  return (
    <section id="top" className="hero">
      <p className="badge">{profile.availability} · {profile.location}</p>
      <h1>{profile.name}</h1>
      <p className="hero-title">{profile.title}</p>
      <p className="hero-tagline">{profile.tagline}</p>
      <div className="hero-actions">
        <a className="btn primary" href="#contact">Me contacter</a>
        <a className="btn" href={profile.links.cv} download>Télécharger mon CV</a>
        <a className="btn ghost" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </section>
  );
}
