import { useState } from 'react';
import Section from './Section.jsx';

const EMPTY = { name: '', email: '', message: '', website: '' };

export default function Contact({ email, links }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrors({});
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors ?? { form: data.error ?? 'Une erreur est survenue.' });
        setStatus('error');
        return;
      }
      setForm(EMPTY);
      setStatus('sent');
    } catch {
      setErrors({ form: 'Serveur injoignable, réessayez plus tard.' });
      setStatus('error');
    }
  }

  return (
    <Section id="contact" title="Contact">
      <p className="lead">
        Une mission freelance ou un poste à pourvoir ? Écrivez-moi via ce formulaire ou directement à{' '}
        <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <label>
          Nom
          <input name="name" value={form.name} onChange={update} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          E-mail
          <input name="email" type="email" value={form.email} onChange={update} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Message
          <textarea name="message" rows="5" value={form.message} onChange={update} required />
          {errors.message && <span className="error">{errors.message}</span>}
        </label>
        <input
          className="honeypot" name="website" value={form.website} onChange={update}
          tabIndex="-1" autoComplete="off" aria-hidden="true"
        />
        {errors.form && <p className="error">{errors.form}</p>}
        {status === 'sent' && <p className="success">Merci, votre message a bien été envoyé !</p>}
        <button className="btn primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi…' : 'Envoyer'}
        </button>
      </form>
      <div className="hero-actions">
        <a className="btn ghost" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a className="btn ghost" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </Section>
  );
}
