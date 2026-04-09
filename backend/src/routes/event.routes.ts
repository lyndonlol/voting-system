import { Router } from 'express';
import { adminOnly, authenticate } from '../middlewares/auth.middleware.ts';
import * as eventController from '../controllers/event.controller.ts';

const router = Router();

router.post('/event', authenticate, adminOnly, eventController.createEvent);
router.get('/event', authenticate, eventController.getEvents);
router.get('/event/:id', authenticate, eventController.getEventById);

export default router;
