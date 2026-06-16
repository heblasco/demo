import { randomUUID } from 'node:crypto';
import type { CreateTaskInput, Task, TaskStats } from './types';

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

export function getTaskStats(): TaskStats {
  let pending = 0;
  let done = 0;

  for (const task of tasks) {
    if (task.status === 'done') {
      done += 1;
      continue;
    }
    pending += 1;
  }

  return {
    total: tasks.length,
    pending,
    done,
  };
}

export function resetStore(): void {
  tasks.length = 0;
}
