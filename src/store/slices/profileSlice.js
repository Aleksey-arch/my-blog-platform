import { createSlice } from '@reduxjs/toolkit';
import { apiPostLogin } from '../../api/apiPostLogin.js';
import { apiGetProfileToken } from '../../api/apiGetProfileToken.js';

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    profile: null,
    status: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    errorSignIn: null,
  },
  reducers: {
    profileLogOut: (state, action) => {
      state.profile = null;
    },
    profileLoading: (state, action) => {
      state.loading = !state.loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiPostLogin.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
        state.errorSignIn = null;
      })
      .addCase(apiPostLogin.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.loading = false;
        state.profile = action.payload;
        state.errorSignIn = null;
      })
      .addCase(apiPostLogin.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.errorSignIn = true;
      })
      .addCase(apiGetProfileToken.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(apiGetProfileToken.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { actions, reducer } = profileSlice;
