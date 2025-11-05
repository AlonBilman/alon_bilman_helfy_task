import { useRef, useEffect } from 'react';
import type { Task } from '../services/task.service';
import './TaskList.css';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (task: Task) => void;
}

export default function TaskList({ tasks, onToggle, onDelete, onEdit }: TaskListProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || tasks.length === 0) return;

    const half = element.scrollWidth / 2;

    const onScroll = () => {
      if (element.scrollLeft >= half) element.scrollLeft -= half;
      else if (element.scrollLeft <= 0) element.scrollLeft += half;
    };

    //convert vertical wheel to horizontal scroll, its more natural 
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener('scroll', onScroll, { passive: true });
    element.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      element.removeEventListener('scroll', onScroll as EventListener);
      element.removeEventListener('wheel', onWheel as EventListener);
    };
  }, [tasks]);

  if (tasks.length === 0) {
      return <p>No tasks to show</p>;
  }

  const looped = [...tasks, ...tasks];

  //default no-op handlers keep current callers compatible
  const handleToggle = onToggle ?? (() => {});
  const handleDelete = onDelete ?? (() => {});

  return (
    <div className="carousel-container">
      <div className="carousel" ref={ref}>
        {looped.map((t, i) => (
          <div key={`${t.id}-${i}`} className="carousel-item">
            <TaskItem task={t} onToggle={handleToggle} onDelete={handleDelete} onEdit={onEdit} />
          </div>
        ))}
      </div>
    </div>
  );
}
