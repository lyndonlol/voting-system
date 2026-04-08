import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/health_check', (_req, res) => {
    res.status(200).json({
    status: 'OK',
message: 'Voting system backend is running',
});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
