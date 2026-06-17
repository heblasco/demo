# AGENTS.md — Contrato del equipo

> Este es el **conocimiento compartido** que siguen todas las personas y todos los agentes
> (Copilot en agent mode, los custom agents de `.github/agents/` y el cloud agent) que trabajan
> en este repositorio. Está **versionado con el código**: si cambia nuestra forma de trabajar, cambia aquí.
>

## Qué es este proyecto
API REST de tareas (To-Do) en **Node.js 20 + TypeScript + Express**. Tests con **Vitest** + **supertest**.
Es un proyecto sencillo a propósito: el foco es **cómo trabajamos**, no la app.

## Comandos (usa exactamente estos)
- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev`  → servidor en `http://localhost:3000`
- Tests: `npm test`  → debe quedar **en verde** antes de proponer un PR
- Compilar / type-check: `npm run build`

## Estructura
- `src/app.ts` — crea la app Express y monta las rutas.
- `src/server.ts` — arranque del servidor.
- `src/tasks/` — dominio de tareas:
  - `types.ts` — tipos (`Task`, `TaskStatus`, inputs).
  - `store.ts` — almacenamiento **en memoria** (sin base de datos).
  - `routes.ts` — endpoints de `/tasks`.
- `test/` — tests de la API.

## Convenciones de la API
- Respuesta de éxito: `{ "data": <payload> }`.
- Respuesta de error: `{ "error": { "message": "<texto claro en español>" } }`.
- Códigos: `200` OK · `201` creado · `400` validación · `404` no encontrado.
- **Valida siempre la entrada** antes de tocar el store.
- TypeScript en modo estricto: nada de `any`.

## Límites (lo que NO se hace en esta demo)
- No añadir base de datos ni dependencias nuevas sin justificarlo en el plan.
- No introducir autenticación ni frameworks adicionales.
- No commitear secretos ni `.env`.
- El store es en memoria: no asumas persistencia entre reinicios.

## Flujo de trabajo
- Cambios pequeños y enfocados.
- Toda funcionalidad nueva recorre: **plan → implementación → tests → review → docs**.
