import { RootState } from "./store";

export const userLogged = (state: RootState) => state.userInfo.userLogged;
export const userLoggedloading = (state: RootState) => state.userInfo.loading;
export const users = (state: RootState) => state.userInfo.users;
export const loadingUsers = (state: RootState) => state.userInfo.loadingUsers;
