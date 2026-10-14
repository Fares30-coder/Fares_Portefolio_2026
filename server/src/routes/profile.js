import { Router } from 'express';
import { readFile } from 'node:fs/promises';

const router = Router();
const profileUrl = new URL('../../data/profile.json', import.meta.url);

router.get('/', async (_req, res, next) => {
  try {
    const profile = JSON.parse(await readFile(profileUrl, 'utf8'));
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
