import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiPostNewProfile = createAsyncThunk(
  'apiPostNewProfile',
  async (data, { RejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://blog-platform.kata.academy/api/users',
        {
          user: {
            email: data.email,
            password: data.password,
            username: data.username,
          },
        },
      );

      if (response.status === 200) {
        localStorage.setItem('token', response?.data?.user?.token);
        return response.data;
      }
    } catch (r) {
      if (r.status === 422) {
        // console.log('такой username/email уже занят!');
      }
      return RejectWithValue(r.message);
    }
  },
);
