import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiGetProfileToken = createAsyncThunk(
  'apiGetProfileToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.log('not token');
        return rejectWithValue('Токен не найден в localStorage'); // Ошибка, если нет токена
      }

      const response = await axios.get(
        `https://blog-platform.kata.academy/api/user`, // Исправленный endpoint
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else if (response.status >= 400) {
        const errorData = response.data || {
          message: `Ошибка сервера ${response.status}`,
        };
        return rejectWithValue(
          errorData.message || errorData.error || errorData.errors,
        );
      }
    } catch (error) {
      console.error('Ошибка при получении профиля:', error);
      return rejectWithValue(
        error.message || 'Не удалось получить данные пользователя',
      );
    }
  },
);
