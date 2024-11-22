import { RootState } from "./store";

export const taskAvalibles = (state: RootState) => state.taskInfo.task;
export const taskAvaliblesloading = (state: RootState) => state.taskInfo.loading;

