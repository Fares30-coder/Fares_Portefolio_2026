# Portfolio — Fares Haouari

**🔗 En ligne : [fares-portefolio-2026.onrender.com](https://fares-portefolio-2026.onrender.com)**

Mon portfolio / CV en ligne, développé en full-stack JavaScript : un front **React** et une API **Node.js / Express** qui sert le contenu du CV et gère le formulaire de contact.

> Développeur logiciel diplômé d'Epitech (Bac+5), à la recherche d'un CDI à Lille et dans le Nord-Pas-de-Calais.
> [LinkedIn](https://www.linkedin.com/in/fares-haouari/) · fares.haouari@epitech.eu

## Stack

| Partie | Technologies |
|---|---|
| Front | React 18, Vite, CSS (thème clair / sombre, responsive) |
| Back | Node.js, Express, Helmet, express-rate-limit |
| E-mails | Resend (API HTTPS) en production, SMTP / Nodemailer en local |
| Hébergement | Render — un seul service qui sert l'API et le front compilé |

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

## Déploiement (Render)

Web Service Node relié à ce dépôt, redéployé automatiquement à chaque push sur `main` :

- **Build** : `npm install; npm run build` (installe server + client, puis compile le front)
- **Start** : `npm start` (Express sert l'API et `client/dist` sur le même port)
- **Variables** : `CONTACT_TO` et `RESEND_API_KEY`

Le SMTP sortant est bloqué sur l'offre gratuite de Render, d'où l'envoi via l'API HTTPS de Resend en production.
