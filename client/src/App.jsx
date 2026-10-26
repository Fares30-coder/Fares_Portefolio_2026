import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setProfile)
      .catch(() => setError(true));
  }, []);

  if (error) return <p className="status">Impossible de charger le profil. Le serveur est-il lancé ?</p>;
  if (!profile) return <p className="status">Chargement…</p>;

  return (
    <>
      <Navbar name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About paragraphs={profile.about} interests={profile.interests} />
        <Services services={profile.services} />
        <Skills skills={profile.skills} />
        <Experience experiences={profile.experiences} />
        <Projects projects={profile.projects} />
        <Education education={profile.education} />
        <Contact email={profile.email} links={profile.links} />
      </main>
      <footer className="footer">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
