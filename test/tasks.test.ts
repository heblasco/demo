import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { completeTask, resetStore } from '../src/tasks/store';

const app = createApp();

beforeEach(() => {
  resetStore();
});

describe('Tasks API', () => {
  it('GET /health responde ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
  });

  it('POST /tasks crea una tarea pendiente', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Comprar café' });
    expect(res.status).toBe(201);
    expect(res.body.data).toMatchObject({ title: 'Comprar café', status: 'pending' });
    expect(typeof res.body.data.id).toBe('string');
  });

  it('POST /tasks sin título devuelve 400', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBeTruthy();
  });

  it('GET /tasks lista las tareas creadas', async () => {
    await request(app).post('/tasks').send({ title: 'A' });
    await request(app).post('/tasks').send({ title: 'B' });
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
  });

  it('GET /tasks/stats devuelve los recuentos de tareas', async () => {
    const taskA = await request(app).post('/tasks').send({ title: 'A' });
    await request(app).post('/tasks').send({ title: 'B' });
    await request(app).post('/tasks').send({ title: 'C' });

    completeTask(taskA.body.data.id);

    const res = await request(app).get('/tasks/stats');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: { total: 3, pending: 2, done: 1 } });
  });
});
