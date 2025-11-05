import { Request, Response, NextFunction } from 'express';

//based on the model Task
const validPriorities = ['low', 'medium', 'high'];

//here I'm checking whether the request body has valid fields for a Task
export function validateTask(req: Request, res: Response, next: NextFunction) {
  const { title, description, priority } = req.body;

  if (typeof title !== 'string' || title.trim().length === 0) {
    return res.status(400).json({ error: 'Title must be non empty string.' });
  }

  if (typeof description !== 'string' || description.trim().length === 0) {
    return res.status(400).json({ error: 'Description must be non empty string.' });
  }

  if (!validPriorities.includes(priority)) {
    return res.status(400).json({ error: 'Priority must be low, medium, or high.' });
  }

  next(); 
}


