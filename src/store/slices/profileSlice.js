import { createSlice } from '@reduxjs/toolkit';
import { apiPostLogin } from '../../api/apiPostLogin.js';
import { apiGetProfileToken } from '../../api/apiGetProfileToken.js';
import { apiPutEditProfile } from '../../api/apiPutEditProfile.js';

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState: {
    profile: null,
    status: null,
    error: null,
    loading: false,
    isAuthenticated: false,
    errorSignIn: null,
    loadingEditProfile: false,
    statusEditProfile: false,
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
      })

      .addCase(apiPutEditProfile.pending, (state, action) => {
        state.statusEditProfile = false;
        state.loadingEditProfile = true;
        state.error = false;
      })
      .addCase(apiPutEditProfile.fulfilled, (state, action) => {
        state.statusEditProfile = true;
        state.loadingEditProfile = false;
        state.error = false;
      })
      .addCase(apiPutEditProfile.rejected, (state, action) => {
        state.statusEditProfile = false;
        state.loadingEditProfile = false;
        state.error = true;
      });
  },
});

export const { actions, reducer } = profileSlice;
