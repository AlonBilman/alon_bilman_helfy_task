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
- Styling and carousel UX: ~5m
