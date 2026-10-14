import Section from './Section.jsx';

export default function About({ paragraphs, interests = [] }) {
  return (
    <Section id="about" title="À propos">
      {paragraphs.map((p, i) => <p key={i} className="lead">{p}</p>)}
      {interests.length > 0 && (
        <>
          <h3 className="subtitle">Centres d'intérêt</h3>
          <ul className="tags">
            {interests.map((i) => <li key={i}>{i}</li>)}
          </ul>
        </>
      )}
    </Section>
  );
}
