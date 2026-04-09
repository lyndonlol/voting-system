import { Router } from 'express';
import authRoutes from './auth.routes.ts';
import eventRoutes from './event.routes.ts';

const rootRouter = Router();

rootRouter.use('/api/v1', authRoutes);
rootRouter.use('/api/v1', eventRoutes);

export default rootRouter;
