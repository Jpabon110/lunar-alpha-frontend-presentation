import { createReducer } from '@reduxjs/toolkit';
import { getAlerts } from '../actions/alerts.actions';
import { Alert } from '../../interfaces/interfaces';

interface initialProps {
  loading: boolean;
  alerts: Alert[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  error: string | null;
}

const initialState: initialProps = {
  loading: false,
  alerts: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  error: null,
};

export const alertsReducerSwitch = createReducer(initialState, (builder) => {
  builder
    .addCase(getAlerts.pending, (state) => {
      state.loading = true;
    })
    .addCase(getAlerts.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = action.payload.events; 
      state.page = action.payload.pagination.page; 
      state.limit = action.payload.pagination.limit;
      state.total = action.payload.pagination.total;
      state.totalPages = action.payload.pagination.totalPages;
    })
    .addCase(getAlerts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error reducer resources';
    })

});
