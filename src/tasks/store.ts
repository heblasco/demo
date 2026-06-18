import { randomUUID } from 'node:crypto';
import type { CreateTaskInput, Task, TaskStats, TaskStatus } from './types';

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

export function updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
  const task = getTask(id);
  if (!task) {
    return undefined;
  }
  task.status = status;
  return task;
}

export function getTasksStats(): TaskStats {
  return tasks.reduce<TaskStats>(
    (stats, task) => {
      stats.total += 1;
      if (task.status === 'done') {
        stats.done += 1;
      } else {
        stats.pending += 1;
      }
      return stats;
    },
    { total: 0, pending: 0, done: 0 },
  );
}

export function resetStore(): void {
  tasks.length = 0;
}
