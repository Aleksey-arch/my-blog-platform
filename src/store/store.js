import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { articlesDataSlice } from './slices/articlesDataSlice.js';
import { profileSlice } from './slices/profileSlice.js';

export const rootReducer = combineSlices({
  articlesData: articlesDataSlice.reducer,
  loginProfile: profileSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
