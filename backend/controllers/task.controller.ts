import { Request , Response } from 'express';
import { Task } from '../models/task.model';
import { tasks } from '../store/task.store';

let incrementedId = 1;

//These functions comes after validation

//GET /api/tasks 
export const getTasks = (_req: Request, res: Response) => {
  res.json(tasks);
};

//POST /api/tasks 
export const createTask = (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  const newTask: Task = {
    id: incrementedId++,
    title,
    description,
    completed: false,
    createdAt: new Date(),
    priority
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

//PUT /api/tasks/:id 
export const updateTask = (req: Request, res: Response) => {
 
};

//DELETE /api/tasks/:id
export function deleteTask(req: Request, res: Response) {
};

//PATCH /api/tasks/:id/toggle
export function toggleTask(req: Request, res: Response) {
};