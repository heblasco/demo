import express, { type Express } from 'express';
import { tasksRouter } from './tasks/routes';

export function createApp(): Express {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ data: { status: 'ok' } });
  });

  app.use('/tasks', tasksRouter);

  return app;
}
