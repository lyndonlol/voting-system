import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.ts';
import rootRouter from './routes/index.ts';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/v1', rootRouter);

// Health check
app.get('/health_check', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Voting system backend is running',
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
