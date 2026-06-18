export type TaskStatus = 'pending' | 'done';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: string;
}

export interface CreateTaskInput {
  title: string;
}

export interface TaskStats {
  total: number;
  pending: number;
  done: number;
}
