# Fares_Portefolio_2026

Portfolio / CV en ligne — **React (Vite)** pour le front, **Node.js (Express)** pour l'API.

## Structure

```
client/                 Front React
  src/components/       Une section du CV par composant
  public/cv.pdf         Votre CV en PDF (à ajouter)
server/                 API Express
  data/profile.json     ← TOUT le contenu du CV se modifie ici
  src/routes/           /api/profile et /api/contact
```

## Lancer en local

```bash
npm run install:all     # installe racine + server + client
cp server/.env.example server/.env
npm run dev             # API sur :3001, front sur http://localhost:5173
```

## Production

```bash
npm run build           # compile le front dans client/dist
npm start               # Express sert l'API et le front sur le même port
```

## API

| Méthode | Route          | Rôle                                                   |
|---------|----------------|--------------------------------------------------------|
| GET     | `/api/health`  | Vérifie que le serveur tourne                          |
| GET     | `/api/profile` | Renvoie le contenu du CV (`server/data/profile.json`)  |
| POST    | `/api/contact` | Reçoit un message (validation, rate-limit, anti-spam)  |

Les messages sont enregistrés dans `server/data/messages.json` et envoyés par e-mail si les variables SMTP sont renseignées dans `server/.env`.
