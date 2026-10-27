import { useEffect, useState } from 'react';

// Écran d'attente façon terminal, affiché pendant que l'API se réveille.
const STEPS = [
  { at: 0, text: '$ npm start' },
  { at: 600, text: '> Connexion au serveur…' },
  { at: 4000, text: '> Le serveur sort de veille, encore quelques secondes ☕' },
  { at: 15000, text: '> Chargement des projets et des expériences…' },
  { at: 35000, text: '> Presque prêt, merci de votre patience !' },
];

export default function BootScreen({ failed = false, onRetry }) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setElapsed(Date.now() - start), 250);
    return () => clearInterval(id);
  }, []);

  const lines = STEPS.filter((s) => elapsed >= s.at);
  // Barre de progression « optimiste » : rapide au début, puis ralentit sans jamais atteindre 100 %
  const progress = Math.round(95 * (1 - Math.exp(-elapsed / 20000)));

  return (
    <div className="boot" role="status" aria-live="polite">
      <div className="boot-window">
        <div className="boot-bar">
          <span className="cover-dots"><i /><i /><i /></span>
          <span className="boot-title">fares-haouari — portfolio</span>
        </div>
        <pre className="boot-body">
          {lines.map((l) => <span key={l.at} className="boot-line">{l.text}{'\n'}</span>)}
          {failed
            ? <span className="boot-error">{'> Le serveur ne répond pas pour le moment.\n'}</span>
            : <span className="boot-cursor" aria-hidden="true">▍</span>}
        </pre>
        {failed ? (
          <button className="btn primary boot-retry" onClick={onRetry}>Réessayer</button>
        ) : (
          <div className="boot-progress" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
}
