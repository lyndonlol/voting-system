import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.ts';
import * as eventController from '../controllers/event.controller.ts';

const router = Router();

router.post('/event', authenticate, eventController.createEvent);

export default router;
