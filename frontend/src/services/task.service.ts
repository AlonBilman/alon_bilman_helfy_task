export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
};

const SERVER_URL = 'http://localhost:4000/api/tasks';

async function handleResponse(res: Response) {
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  if (res.status === 204) {
    return;
  }
  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  const text = await res.text();
  return text ? JSON.parse(text) : undefined;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(SERVER_URL);
  return handleResponse(res);
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt' | 'completed'>) {
  const res = 
    await fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  return handleResponse(res);
}

export async function updateTask(id: number, updates: Partial<Task>) {
  const res = 
    await fetch(`${SERVER_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });

  return handleResponse(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${SERVER_URL}/${id}`, {
    method: 'DELETE',
  });
  await handleResponse(res);
}

export async function toggleTask(id: number) {
  const res = await fetch(`${SERVER_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  return handleResponse(res);
}