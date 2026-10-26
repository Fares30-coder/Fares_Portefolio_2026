import { useState } from 'react';

const LINKS = [
  ['about', 'À propos'],
  ['services', 'Freelance'],
  ['skills', 'Compétences'],
  ['experience', 'Expériences'],
  ['projects', 'Projets'],
  ['education', 'Formation'],
  ['contact', 'Contact'],
];

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const initials = name.split(' ').map((w) => w[0]).join('');

  return (
    <header className="navbar">
      <a href="#top" className="logo">{initials}</a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        ☰
      </button>
      <nav className={open ? 'nav open' : 'nav'}>
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
