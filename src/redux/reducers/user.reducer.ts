import { createReducer } from '@reduxjs/toolkit';
import { login, getUsers } from '../actions/user.actions';
import { User, UserLogged } from '../../interfaces/interfaces';
import { getLocalStorageToken,saveLocalStorageToken } from '../../utils/localStorage';

interface initialProps {
  loading: boolean;
  loadingUsers: boolean;
  userLogged: UserLogged;
  users: User[],
  error: string | null;
}

const initialState: initialProps = {
  loading: false,
  loadingUsers: false,
  userLogged: { 
    token: getLocalStorageToken(),
  },
  users: [],
  error: null,
};

export const reducerSwitch = createReducer(initialState, (builder) => {
  builder
    .addCase(login.pending, (state) => {
      state.loading = true;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.userLogged = action.payload;
      saveLocalStorageToken(action.payload.token);
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error reducer user login';
    })
    .addCase(getUsers.pending, (state) => {
      state.loadingUsers = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.loadingUsers = false;
      state.users = action.payload;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.loadingUsers = false;
      state.error = action.error.message || 'Error reducer user in getUsers';
    })

});
