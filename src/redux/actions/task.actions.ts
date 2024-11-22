import { createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../../interfaces/interfaces';
import { taskService } from '../../services/task.services';

export const getTasks = createAsyncThunk<Task[]>(
  '/task',
  async (_, thunkAPI) => {
    try {
      const response = await taskService.getTasks();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get tasks');
    }
  }
);

export const createTasks = createAsyncThunk<Task, Task, { rejectValue: string }>(
  'create/task',
  async (task: Task, thunkAPI) => {
    try {
      const response = await taskService.createTask(task);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get tasks');
    }
  }
);

export const updateTask = createAsyncThunk<void, Task, { rejectValue: string }>(
  'update/task',
  async (task: Task, thunkAPI) => {
    try {
      await taskService.updateTask(task);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to update tasks');
    }
  }
);

export const removeTask = createAsyncThunk<void, Task, { rejectValue: string }>(
  'delete/task',
  async (task: Task, thunkAPI) => {
    try {
      await taskService.removeTask(task);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete tasks');
    }
  }
);
