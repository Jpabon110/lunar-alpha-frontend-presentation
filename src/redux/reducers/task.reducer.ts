import { createReducer } from '@reduxjs/toolkit';
import { getTasks, createTasks, updateTask, removeTask } from '../actions/task.actions';
import { Task } from '../../interfaces/interfaces';

interface initialProps {
  loading: boolean;
  loadingCreateTask: boolean;
  loadingUpdateTask: boolean;
  loadingDeleteTask: boolean;
  task: Task[];
  createTask: Task;
  error: string | null;
}

const initialState: initialProps = {
  loading: false,
  task: [],
  createTask: {
      id: 8,
      title: '',
      description: '',
      priority: '',
      userId: 0,
  },
  loadingCreateTask: false,
  loadingUpdateTask: false,
  loadingDeleteTask: false,
  error: null,
};

export const taskReducerSwitch = createReducer(initialState, (builder) => {
  builder
    .addCase(getTasks.pending, (state) => {
      state.loading = true;
    })
    .addCase(getTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.task = action.payload; 
    })
    .addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error reducer task';
    })
    .addCase(createTasks.pending, (state) => {
      state.loadingCreateTask = true;
    })
    .addCase(createTasks.fulfilled, (state, action) => {
      state.loadingCreateTask = false;
      state.createTask = action.payload; 
    })
    .addCase(createTasks.rejected, (state, action) => {
      state.loadingCreateTask = false;
      state.error = action.error.message || 'Error reducer task';
    })
    .addCase(updateTask.pending, (state) => {
      state.loadingUpdateTask = true;
    })
    .addCase(updateTask.fulfilled, (state, action) => {
      state.loadingDeleteTask = false;
    })
    .addCase(updateTask.rejected, (state, action) => {
      state.loadingCreateTask = false;
      state.error = action.error.message || 'Error reducer task';
    })
    .addCase(removeTask.pending, (state) => {
      state.loadingDeleteTask = true;
    })
    .addCase(removeTask.fulfilled, (state, action) => {
      state.loadingDeleteTask = false;
    })
    .addCase(removeTask.rejected, (state, action) => {
      state.loadingDeleteTask = false;
      state.error = action.error.message || 'Error reducer task';
    })

});
