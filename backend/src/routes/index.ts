import { Router } from 'express';
import authRoutes from './auth.routes.ts';

const rootRouter = Router();

rootRouter.use(authRoutes);

export default rootRouter;
