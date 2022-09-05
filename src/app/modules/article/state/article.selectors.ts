import { createSelector } from '@ngrx/store';
import { Pagination } from 'arvan/core/models/pagination-model';
import { ArticleState, getArticleFeature } from './article.reducer';

export const selectArticles = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.articles
);

export const selectArticleFilters = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.filters
);

export const selectArticlePagination = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.filters.pagination
);

export const selectTags = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.tags
);

export const selectCheckedTags = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.checkedTags
);

export const selectArticleSaving = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.saving
);

export const selectSelectedArticle = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.selectedArticle
);

export const selectArticleDeleting = createSelector(
  getArticleFeature,
  (state: ArticleState) => state.deleting
);
