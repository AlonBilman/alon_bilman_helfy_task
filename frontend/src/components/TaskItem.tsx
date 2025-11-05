import type { Task } from '../services/task.service';
export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
}) {
  return (
    <div className={`task-item ${task.completed ? 'done' : ''}`}>
      <div className="task-header">
        <h3 className={task.completed ? 'completed' : ''}>
          {task.title} {task.completed && ' ✓'}
        </h3>
        <span className={`priority ${task.priority}`}>{task.priority}</span>
      </div>

      <p>{task.description}</p>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? 'Mark Undone' : 'Mark Done'}
        </button>
        <button onClick={() => onEdit?.(task)}>Edit</button>
        <button className="delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
