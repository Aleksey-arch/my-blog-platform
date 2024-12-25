import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiDeleteArticle = createAsyncThunk(
  'apiDeleteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,

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
