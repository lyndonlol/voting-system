import { Router } from 'express';
import authRoutes from './auth.routes.ts';
import eventRoutes from './event.routes.ts';
import voteRoutes from './vote.routes.ts';

const rootRouter = Router();

rootRouter.use('/api/v1', authRoutes);
rootRouter.use('/api/v1', eventRoutes);
rootRouter.use('/api/v1', voteRoutes);

export default rootRouter;
