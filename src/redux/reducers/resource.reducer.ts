import { createReducer } from '@reduxjs/toolkit';
import { getResources } from '../actions/resource.actions';
import { Resource } from '../../interfaces/interfaces';

interface initialProps {
  loading: boolean;
  resources: Resource[];
  error: string | null;
}

const initialState: initialProps = {
  loading: false,
  resources: [],
  error: null,
};

export const resourceReducerSwitch = createReducer(initialState, (builder) => {
  builder
    .addCase(getResources.pending, (state) => {
      state.loading = true;
    })
    .addCase(getResources.fulfilled, (state, action) => {
      state.loading = false;
      state.resources = action.payload; 
    })
    .addCase(getResources.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Error reducer resources';
    })

});
