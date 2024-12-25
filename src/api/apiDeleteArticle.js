import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiDeleteArticle = createAsyncThunk(
  'apiDeleteArticle',
  async (data, { RejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `https://blog-platform.kata.academy/api/articles/${data?.slug}`,
        { headers: { Authorization: `Token ${token}` } },
      );

      // console.log(response);

      if (response.status === 200) {
        return response.data;
      }
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);
