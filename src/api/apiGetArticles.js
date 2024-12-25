import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiGetArticles = createAsyncThunk(
  'apiGetArticles',
  async (paginationNumber, { RejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://blog-platform.kata.academy/api/articles',
        {
          params: {
            limit: 5,
            offset: paginationNumber * 5 - 5,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Исправлено на "Token", а не "Bearer"
          },
        },
      );
      if (response.status === 200) {
        console.log(response);
        return response.data;
      }
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);
