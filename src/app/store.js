import { configureStore } from '@reduxjs/toolkit';
import songSliceReducer from '../features/songSlice';

export const store = configureStore({
  reducer: {
    songs: songSliceReducer,
  },
});
