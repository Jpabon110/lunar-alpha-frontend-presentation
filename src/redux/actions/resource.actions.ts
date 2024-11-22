import { createAsyncThunk } from '@reduxjs/toolkit';
import { Resource } from '../../interfaces/interfaces';
import { resourceService } from '../../services/resource.services';

export const getResources = createAsyncThunk<Resource[]>(
  '/resource',
  async (_, thunkAPI) => {
    try {
      const response = await resourceService.getResources();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get resources');
    }
  }
);
