import { useCallback, useEffect, useState } from 'react';
import { fetchProfile } from './api.js';
import BootScreen from './components/BootScreen.jsx';
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

  const load = useCallback(() => {
    setError(false);
    fetchProfile().then(setProfile).catch(() => setError(true));
  }, []);

  useEffect(load, [load]);

  if (!profile) return <BootScreen key={String(error)} failed={error} onRetry={load} />;

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
