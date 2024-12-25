import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiPostLogin = createAsyncThunk(
  'apiPostLogin',
  async (data, { RejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://blog-platform.kata.academy/api/users/login',
        {
          user: {
            email: data.email,
            password: data.password,
          },
        },
      );

      if (response.status === 200) {
        // console.log(response);
        return response.data;
      }
    } catch (r) {
      return RejectWithValue(r.message);
    }
  },
);
