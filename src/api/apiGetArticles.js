import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiGetArticles = createAsyncThunk(
  'apiGetArticles',
  async (paginationNumber, { RejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://blog-platform.kata.academy/api/articles',
        {
          params: {
            limit: 5,
            offset: paginationNumber * 5 - 5,
          },
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);
