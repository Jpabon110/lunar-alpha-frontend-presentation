import { Task } from '../interfaces/interfaces';
import { getLocalStorageToken } from '../utils/localStorage';

const BASE_URL = import.meta.env.VITE_API_URL;
const userLoggedInfo = getLocalStorageToken();

const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}`  },
  });
  return response.json();
};

const createTask = async (taskInfo: Task): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}`  },
    body: JSON.stringify(taskInfo),
  });
  return response.json();
};

const updateTask = async (taskInfo: Task): Promise<void> => {
  const response = await fetch(`${BASE_URL}/tasks/${taskInfo.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Beare ${userLoggedInfo}`  },
    body: JSON.stringify({
      assignedToId: taskInfo.userId,
      title: taskInfo.title,
      description: taskInfo.description,
      priority: taskInfo.priority
    }),
  });
  return response.json();
};

const removeTask = async (taskInfo: Task): Promise<void> => {
 await fetch(`${BASE_URL}/tasks/${taskInfo.id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Beare ${userLoggedInfo}`
      }
  })
  .then(response => response)
  .catch(error => { console.log("theres something wrong", error) });
}


export const taskService = { getTasks, createTask, updateTask, removeTask };
