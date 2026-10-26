# Portfolio — Fares Haouari

**🔗 En ligne : [fares-portefolio-2026.onrender.com](https://fares-portefolio-2026.onrender.com)**

Mon portfolio / CV en ligne, développé en full-stack JavaScript : un front **React** et une API **Node.js / Express** qui sert le contenu du CV et gère le formulaire de contact.

> Développeur Full-Stack diplômé d'Epitech (Bac+5), disponible en freelance et ouvert à un CDI à Lille et dans les Hauts-de-France.
> [LinkedIn](https://www.linkedin.com/in/fares-haouari/) · fares.haouari@epitech.eu

## Stack

| Partie | Technologies |
|---|---|
| Front | React 18, Vite, CSS (thème clair / sombre, responsive) |
| Back | Node.js, Express, Helmet, express-rate-limit |
| E-mails | Resend (API HTTPS) en production, SMTP / Nodemailer en local |
| Hébergement | Front sur OVH (déployé par GitHub Actions), API sur Render |

## Fonctionnalités

- Contenu du CV servi par l'API depuis un seul fichier JSON : aucune modification de code pour mettre le CV à jour
- Formulaire de contact avec validation côté serveur, limite de 5 messages / 15 min par IP et champ honeypot anti-spam
- Chaque message est transmis par e-mail, avec le recruteur en « Répondre à »
- Téléchargement du CV en PDF

## Structure

```
client/                 Front React (Vite)
  src/components/       Une section du CV par composant
  public/cv.pdf         CV téléchargeable
server/                 API Express
  data/profile.json     Contenu du CV (expériences, projets, compétences…)
  src/routes/           /api/profile et /api/contact
```

## Lancer en local

Prérequis : Node.js 20 ou plus.

```bash
npm run install:all                 # installe racine + server + client
cp server/.env.example server/.env  # puis renseigner les variables (voir plus bas)
npm run dev                         # API sur :3001, front sur http://localhost:5173
```

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `CONTACT_TO` | Adresse qui reçoit les messages du formulaire |
| `RESEND_API_KEY` | Clé [Resend](https://resend.com) — prioritaire si renseignée |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Alternative SMTP (ex. Gmail + mot de passe d'application), pratique en local |
| `PORT` | Port de l'API (3001 par défaut ; fourni automatiquement par Render) |

Sans configuration e-mail, les messages sont seulement enregistrés dans `server/data/messages.json`.

## API

| Méthode | Route | Rôle |
|---|---|---|
| GET | `/api/health` | Vérifie que le serveur tourne |
| GET | `/api/profile` | Renvoie le contenu du CV |
| POST | `/api/contact` | Reçoit un message `{ name, email, message }` |

## Déploiement

Le front et l'API sont hébergés séparément :

| Partie | Hébergement | Déploiement |
|---|---|---|
| Front React | OVH (hébergement Start 10M) | GitHub Actions → FTP, à chaque push sur `main` touchant `client/` |
| API Express | Render (Web Service gratuit) | automatique à chaque push sur `main` |

L'API gratuite de Render s'endort après 15 min d'inactivité : le front, toujours disponible, affiche un écran d'attente façon terminal et réessaie jusqu'au réveil de l'API.

**GitHub Actions** (`.github/workflows/deploy-ovh.yml`) — à configurer dans *Settings → Secrets and variables → Actions* :
- secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (identifiants FTP de l'hébergement OVH)
- variable `VITE_API_URL` : adresse de l'API Render

**Render** :
- **Build** : `npm install; npm run build` · **Start** : `npm start`
- **Variables** : `CONTACT_TO`, `RESEND_API_KEY` et `CLIENT_ORIGIN` (adresses du front autorisées, séparées par des virgules)

Le SMTP sortant est bloqué sur l'offre gratuite de Render, d'où l'envoi via l'API HTTPS de Resend en production.
