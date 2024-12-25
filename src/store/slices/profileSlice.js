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
        state.error = null;
      })
      .addCase(apiPostLogin.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(apiPostLogin.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = true;
      })
      .addCase(apiGetProfileToken.fulfilled, (state, action) => {
        // Обработка успеха
        state.profile = action.payload; // Сохраняем данные пользователя из ответа
        state.isAuthenticated = true; //  Флаг, что пользователь авторизован
      })
      .addCase(apiGetProfileToken.rejected, (state, action) => {
        // Обработка ошибки
        state.error = action.payload; // Сохраняем сообщение об ошибке
        state.isAuthenticated = false; // Флаг, что пользователь не авторизован
        // Другая логика обработки ошибок если нужно
      });
  },
});

export const { actions, reducer } = profileSlice;
