# Tasks API

API REST de tareas (To-Do) en **Node.js + TypeScript + Express**, con tests en **Vitest**.
Servicio sencillo para gestionar una lista de tareas.

## Requisitos
- Node.js 20+

## Arranque
```bash
npm install
npm run dev     # servidor en http://localhost:3000
npm test        # tests
npm run build   # compila a dist/
```

## Endpoints
| Método | Ruta        | Descripción            |
| ------ | ----------- | ---------------------- |
| GET    | /health     | Healthcheck            |
| GET    | /tasks      | Lista todas las tareas |
| POST   | /tasks      | Crea una tarea         |
| GET    | /tasks/stats| Resumen de tareas      |
| GET    | /tasks/:id  | Obtiene una tarea      |

### Convenciones de la API
- Éxito: `{ "data": <payload> }`
- Error: `{ "error": { "message": "<texto>" } }`

## Estructura
```
src/
  app.ts            # crea la app Express y monta rutas
  server.ts         # arranque del servidor
  tasks/
    types.ts        # Task, TaskStatus, inputs
    store.ts        # almacenamiento en memoria
    routes.ts       # endpoints /tasks
test/
  tasks.test.ts     # tests de la API
.github/
  agents/           # roles del equipo (custom agents de Copilot)
  workflows/ci.yml  # CI: build + test
```
