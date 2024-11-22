import { RootState } from "./store";

export const resourcesAvalibles = (state: RootState) => state.resourceInfo.resources;
export const resourcesAvaliblesloading = (state: RootState) => state.resourceInfo.loading;
