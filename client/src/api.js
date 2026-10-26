// Adresse de l'API. En local, vide : Vite redirige /api vers le serveur Node (voir vite.config.js).
// En production, le front est hébergé à part (OVH) et appelle l'API Render : VITE_API_URL est
// fourni au moment du build (voir .github/workflows/deploy-ovh.yml).
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export const apiUrl = (path) => `${API_URL}${path}`;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// L'API gratuite de Render s'endort après 15 min d'inactivité et met jusqu'à ~1 min à redémarrer.
// On réessaie donc pendant ce temps au lieu d'afficher une erreur au premier échec.
export async function fetchProfile({ timeoutMs = 90_000 } = {}) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(apiUrl('/api/profile'));
      if (res.ok) return await res.json();
      lastError = new Error(`HTTP ${res.status}`);
    } catch (err) {
      lastError = err;
    }
    await wait(3000);
  }
  throw lastError ?? new Error('Délai dépassé');
}
