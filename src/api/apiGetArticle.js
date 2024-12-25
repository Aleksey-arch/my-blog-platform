import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiGetArticle = createAsyncThunk(
  'apiGetArticle',
  async (slugs, { RejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://blog-platform.kata.academy/api/articles/${slugs}`,
        {
          // params: {
          //   // slug: `${slug}`,
          // },
        },
      );

      if (response.status === 200) {
        // console.log(response);
        return response.data;
      }
    } catch (r) {
      console.log(r.message);
      return RejectWithValue(r.message);
    }
  },
);
