import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiAddFavorite = createAsyncThunk(
  'apiAddFavorite',
  async (slug, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(
          `Server responded with status: ${response.status}`,
        );
      }
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          `Server responded with status: ${error.response.status}, message: ${error.response.data.message}`,
        );
      }
      return rejectWithValue(error.message);
    }
  },
);
