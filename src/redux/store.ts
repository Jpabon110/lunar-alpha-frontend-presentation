import { configureStore } from '@reduxjs/toolkit';
import { reducerSwitch } from './reducers/user.reducer';
import { resourceReducerSwitch } from './reducers/resource.reducer';
import { taskReducerSwitch } from './reducers/task.reducer';
import { alertsReducerSwitch } from './reducers/alerts.reducer';

export const store = configureStore({
  reducer: {
    userInfo: reducerSwitch,
    resourceInfo: resourceReducerSwitch,
    taskInfo: taskReducerSwitch,
    alerts: alertsReducerSwitch,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
