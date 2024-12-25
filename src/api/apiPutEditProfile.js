import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const apiPutEditProfile = createAsyncThunk(
  'apiPutEditProfile',
  async (data, { RejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'https://blog-platform.kata.academy/api/user',

        {
          user: {
            email: data.email,
            password: data.password,
            username: data.username,
            image: data.image,
          },
        },
        { headers: { Authorization: `Token ${token}` } },
      );

      console.log(response);

      if (response.status === 200) {
        // console.log(response);
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
