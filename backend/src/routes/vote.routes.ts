import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.ts';
import * as voteController from '../controllers/vote.controller.ts';

const router = Router();

router.post('/votes', authenticate, voteController.castVote);
router.get('/votes/me', authenticate, voteController.getMyVotes);
router.get('/votes/me/:eventId', authenticate, voteController.getMyVote);

export default router;
