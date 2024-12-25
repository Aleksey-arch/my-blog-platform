import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiPostNewArticle = createAsyncThunk(
  'apiPostNewArticle',
  async (data, { RejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://blog-platform.kata.academy/api/articles',
        {
          article: {
            title: `${data.title}`,
            description: `${data.description}`,
            body: `${data.body}`,
            tagList: [...data.tags],
          },
        },
        { headers: { Authorization: `Token ${token}` } },
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (r) {
      if (r.status === 422) {
        console.log('такой username/email уже занят!');
      }
      return RejectWithValue(r.message);
    }
  },
);
