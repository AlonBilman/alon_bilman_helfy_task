# Task Manager App

## Setup and Installation

### Backend
1. cd backend
2. npm install
3. npm start (runs on port 4000)


### Frontend
1. cd frontend
2. npm install
3. npm start (runs on port 3000)


## How to Run (both apps)
- Open two terminals:
  - Terminal A: run the backend (port 4000)
  - Terminal B: run the frontend (port 3000)
- Visit http://localhost:3000

## Design Decisions 

- Simple in‑memory store on the backend ([backend/store/task.store.ts](backend/store/task.store.ts)); data resets on server restart.
- Frontend re-fetches after each mutation for simplicity.

## Time Spent

- Backend (routes, controller, validation): ~2h 
- Frontend (views, state, service): ~2h
- Styling and carousel UX: 0h

## Project Structure
```
backend/
  controllers/ task.controller.ts
  middleware/ validateTask.ts, validateTaskId.ts
  models/ task.model.ts
  routes/ tasks.route.ts
  store/ task.store.ts
  server.ts
frontend/
  src/
    App.tsx
    main.tsx
    components/ TaskList.tsx, TaskItem.tsx, TaskForm.tsx, TaskList.css
    services/ task.service.ts
```
