import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserLogged, LoginInfo, User } from '../../interfaces/interfaces';
import { userService } from '../../services/user.services';

export const login = createAsyncThunk<UserLogged, LoginInfo>(
  'user/login',
  async (loginInfo, thunkAPI) => {
    try {
      const response = await userService.login(loginInfo);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to login');
    }
  }
);

export const getUsers = createAsyncThunk<User[]>(
  'user/users',
  async (_, thunkAPI) => {
    try {
      const response = await userService.getUsers();
      return response.users;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get users');
    }
  }
);