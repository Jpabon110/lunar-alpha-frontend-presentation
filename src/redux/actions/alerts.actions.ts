import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlertRequest, PaginationRequest } from '../../interfaces/interfaces';
import { eventService } from '../../services/event.services';

export const getAlerts = createAsyncThunk<AlertRequest, PaginationRequest>(
  '/events',
  async (query: PaginationRequest, thunkAPI) => {
    try {
      const response = await eventService.getEvents(query);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to get alerts');
    }
  }
);
