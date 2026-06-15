import { Router, type Request, type Response } from 'express';
import { createTask, getTask, listTasks } from './store';

export const tasksRouter = Router();

tasksRouter.get('/', (_req: Request, res: Response) => {
  res.json({ data: listTasks() });
});

tasksRouter.post('/', (req: Request, res: Response) => {
  const title = (req.body?.title ?? '').toString().trim();
  if (!title) {
    return res.status(400).json({ error: { message: 'El campo "title" es obligatorio.' } });
  }
  const task = createTask({ title });
  return res.status(201).json({ data: task });
});

tasksRouter.get('/:id', (req: Request, res: Response) => {
  const task = getTask(req.params.id);
  if (!task) {
    return res.status(404).json({ error: { message: 'Tarea no encontrada.' } });
  }
  return res.json({ data: task });
});
