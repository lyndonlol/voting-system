import { Router } from 'express';
import { login, register } from '../controllers/auth.controllers.ts';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  try {
    await register(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
    await login(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
