import { randomUUID } from 'node:crypto';
import type { CreateTaskInput, Task } from './types';

const tasks: Task[] = [];

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: randomUUID(),
    title: input.title,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function listTasks(): Task[] {
  return [...tasks];
}

export function getTask(id: string): Task | undefined {
  return tasks.find((task) => task.id === id);
}

export function completeTask(id: string): Task | undefined {
  const task = getTask(id);
  if (!task) {
    return undefined;
  }
  task.status = 'done';
  return task;
}

export function getTasksStats(): { total: number; pending: number; done: number } {
  const total = tasks.length;
  const done = tasks.filter((task) => task.status === 'done').length;
  return { total, pending: total - done, done };
}

export function resetStore(): void {
  tasks.length = 0;
}
