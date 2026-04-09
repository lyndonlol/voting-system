import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.ts';
import * as voteController from '../controllers/vote.controller.ts';

const router = Router();

router.post('/votes', authenticate, voteController.castVote);

export default router;
