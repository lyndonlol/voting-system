import { Router } from 'express';
import { adminOnly, authenticate } from '../middlewares/auth.middleware.ts';
import * as eventController from '../controllers/event.controller.ts';

const router = Router();

router.post('/events', authenticate, adminOnly, eventController.createEvent);
router.get('/events', authenticate, eventController.getEvents);
router.get('/events/:id', authenticate, eventController.getEventById);
router.get(
  '/events/:id/trends',
  authenticate,
  adminOnly,
  eventController.getEventTrends
);

export default router;
