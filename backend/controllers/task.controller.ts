import { Request , Response } from 'express';
import { Task } from '../models/task.model';
import { tasks } from '../store/task.store';

let incrementedId = 1;

//These functions comes after validation

//GET /api/tasks 
export const getTasks = (_req: Request, res: Response) => {
  return res.json(tasks);
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
  return res.status(201).json(newTask);
};

//PUT /api/tasks/:id 
export const updateTask = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id)!;
  const { title, description, priority, completed } = req.body;

  task.title = title;
  task.description = description;
  task.priority = priority;

  if (typeof completed === 'boolean') {
    task.completed = completed;
  }

  return res.json(task);
};

//DELETE /api/tasks/:id
export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const index = tasks.findIndex(t => t.id === parseInt(id)); //already validated
  tasks.splice(index, 1);
  return res.status(204).send();
};

//PATCH /api/tasks/:id/toggle
export const toggleTask = (req: Request, res: Response) => {
  const id = req.params.id;
  const task = tasks.find(t => t.id === parseInt(id))!; //already validated
  task.completed = !task.completed;
  return res.json(task);
};