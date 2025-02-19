import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiGetArticle = createAsyncThunk(
  'apiGetArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `https://blog-platform.kata.academy/api/articles/${slug}`,
        {
          headers: {
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
