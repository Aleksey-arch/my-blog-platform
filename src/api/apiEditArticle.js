import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { actions } from '../store/slices/profileSlice.js';

export const apiEditArticle = createAsyncThunk(
  'apiPostNewArticle',
  async (data, { RejectWithValue }) => {
    try {
      // const dispatch = useDispatch();
      // dispatch(actions.profileLoading());
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://blog-platform.kata.academy/api/articles/${data?.slug}`,
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

      console.log(response);

      if (response.status === 200) {
        dispatch(actions.profileLoading());
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
