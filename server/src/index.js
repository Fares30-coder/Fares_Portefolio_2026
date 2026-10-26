import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import profileRouter from './routes/profile.js';
import contactRouter from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';

// Derrière le proxy de l'hébergeur (Render), pour que le rate-limit voie la vraie IP du visiteur
app.set('trust proxy', 1);
app.use(helmet());
// Le front est hébergé à part (OVH) : on autorise ses adresses à appeler l'API.
// CLIENT_ORIGIN accepte plusieurs adresses séparées par des virgules.
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim().replace(/\/$/, ''))
  .filter(Boolean);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/profile', profileRouter);
app.use('/api/contact', contactRouter);

// En production, le serveur Node sert aussi le front React compilé
if (isProd) {
  const clientDist = path.resolve(__dirname, '../../client/dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
}

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`);
  const { RESEND_API_KEY, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  const via = RESEND_API_KEY ? 'Resend' : SMTP_USER && SMTP_PASS ? 'SMTP' : null;
  console.log(via && CONTACT_TO
    ? `E-mails de contact activés via ${via} → ${CONTACT_TO}`
    : 'E-mails de contact désactivés (voir server/.env.example)');
});
