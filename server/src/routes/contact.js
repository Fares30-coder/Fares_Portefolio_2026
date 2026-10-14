import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { readFile, writeFile } from 'node:fs/promises';
import nodemailer from 'nodemailer';

const router = Router();
const messagesUrl = new URL('../../data/messages.json', import.meta.url);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: { error: 'Trop de messages envoyés, réessayez plus tard.' },
});

function validate({ name, email, message }) {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Nom requis';
  if (!email || !EMAIL_RE.test(email)) errors.email = 'E-mail invalide';
  if (!message || message.trim().length < 10) errors.message = 'Message trop court (10 caractères min.)';
  if (message && message.length > 3000) errors.message = 'Message trop long';
  return errors;
}

async function saveMessage(entry) {
  let messages = [];
  try {
    messages = JSON.parse(await readFile(messagesUrl, 'utf8'));
  } catch {
    // premier message : le fichier n'existe pas encore
  }
  messages.push(entry);
  await writeFile(messagesUrl, JSON.stringify(messages, null, 2));
}

async function sendMail(entry) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) return;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({
    from: SMTP_USER,
    to: CONTACT_TO,
    replyTo: entry.email,
    subject: `[Portfolio] Message de ${entry.name}`,
    text: `${entry.message}\n\n— ${entry.name} <${entry.email}>`,
  });
}

router.post('/', limiter, async (req, res, next) => {
  const { name = '', email = '', message = '', website = '' } = req.body ?? {};

  // Honeypot anti-spam : champ invisible que seuls les bots remplissent
  if (website) return res.status(200).json({ ok: true });

  const errors = validate({ name, email, message });
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const entry = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  };

  try {
    await saveMessage(entry);
    await sendMail(entry);
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
