//I wanted to include this because I did not like that my id validation code
//was inside my controller file... so I created a new folder "store" so I could access it
//hopefully its ok

import { Request, Response, NextFunction } from 'express';
import { tasks } from '../store/task.store';

export function validateTaskId(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Task ID must be a positive integer' });
  }

  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  next();
}

