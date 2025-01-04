import { createSlice } from '@reduxjs/toolkit';
import { apiGetArticles } from '../../api/apiGetArticles.js';
import { apiGetArticle } from '../../api/apiGetArticle.js';
import { apiEditArticle } from '../../api/apiEditArticle.js';
import { apiPostNewArticle } from '../../api/apiPostNewArticle.js';

export const articlesDataSlice = createSlice({
  name: 'articlesDataSlice',
  initialState: {
    articles: [],
    status: null,
    error: null,
    loading: false,
    currentArticle: null,
    conditionTooltipsDelete: false,
    paginationNumber: 1,
    loadingEditArticle: false,
    statusEditArticle: false,
    statusCreateNewArticle: false,
    loadingCreateNewArticle: false,
  },
  reducers: {
    changeConditionTooltipsDelete: (state) => {
      state.conditionTooltipsDelete = !state.conditionTooltipsDelete;
    },
    setPaginationNumber: (state, action) => {
      state.paginationNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiGetArticles.pending, (state, action) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(apiGetArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.loading = false;
        state.articles = action.payload;
        state.error = null;
      })
      .addCase(apiGetArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.loading = false;
        state.error = true;
      })

      .addCase(apiGetArticle.pending, (state, action) => {
        state.status = 'loading article...';
        state.loading = true;
        state.error = false;
      })
      .addCase(apiGetArticle.fulfilled, (state, action) => {
        state.status = 'fulfilled article...';
        state.currentArticle = action.payload.article;
        state.loading = false;
        state.error = false;
      })
      .addCase(apiGetArticle.rejected, (state, action) => {
        state.status = 'rejected article...';
        state.loading = false;
        state.error = true;
      })

      .addCase(apiEditArticle.pending, (state, action) => {
        state.statusEditArticle = false;
        state.loadingEditArticle = true;
        state.error = false;
      })
      .addCase(apiEditArticle.fulfilled, (state, action) => {
        state.statusEditArticle = true;
        state.loadingEditArticle = false;
        state.error = false;
      })
      .addCase(apiEditArticle.rejected, (state, action) => {
        state.statusEditArticle = false;
        state.loadingEditArticle = false;
        state.error = true;
      })

      .addCase(apiPostNewArticle.pending, (state, action) => {
        state.statusCreateNewArticle = false;
        state.loadingCreateNewArticle = true;
        state.error = false;
      })
      .addCase(apiPostNewArticle.fulfilled, (state, action) => {
        state.statusCreateNewArticle = true;
        state.loadingCreateNewArticle = false;
        state.error = false;
      })
      .addCase(apiPostNewArticle.rejected, (state, action) => {
        state.statusCreateNewArticle = false;
        state.loadingCreateNewArticle = false;
        state.error = true;
      });
  },
});

export const { actions, reducer } = articlesDataSlice;
