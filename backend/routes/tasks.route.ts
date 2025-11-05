import express from 'express';
import { validateTask } from '../middleware/validateTask';
import { validateTaskId } from '../middleware/validateTaskId';
import { 
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
} from '../controllers/task.controller';

const router = express.Router();
router.get('/', getTasks);
router.post('/', validateTask, createTask);
router.put('/:id', validateTaskId, updateTask);
router.delete('/:id', validateTaskId, deleteTask);
router.patch('/:id/toggle', validateTaskId, toggleTask);
export default router;
