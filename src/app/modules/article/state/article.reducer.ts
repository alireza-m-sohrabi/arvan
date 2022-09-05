import { createFeatureSelector, createReducer, on } from '@ngrx/store';
import { ErrorProps } from 'arvan/state/models/state.models';
import { ArticleFilterProps, ArticleProps } from './model';
import * as ArticleActions from './article.actions';

export interface ArticleState
  extends ErrorProps<any>,
    ArticleFilterProps,
    ArticleProps {}

const articleInitialState: ArticleState = {
  error: undefined,
  filters: {
    pagination: {
      limit: 20,
      offset: 0,
      pageNumber: 1,
      total: 0,
    },
  },
  saving: false,
  deleting: false,
  selectedArticle: undefined,
  slug: undefined,
};

export const articleReducer = createReducer(
  articleInitialState,
  on(ArticleActions.getArticlesSuccess, (state, { total, items }) => ({
    ...state,
    articles: items,
    filters: {
      ...state.filters,
      total,
    },
  })),

  on(ArticleActions.createArticle, (state) => ({
    ...state,
    saving: true,
  })),
  on(ArticleActions.createArticleSuccess, (state, article) => {
    return {
      ...state,
      selectedArticle: undefined,
      saving: false,
      error: undefined,
    };
  }),
  on(ArticleActions.createArticleFail, (state, error) => ({
    ...state,
    error: error,
    saving: false,
    checkedTags: undefined,
  })),
  on(ArticleActions.updateArticle, (state) => ({
    ...state,
    saving: true,
  })),
  on(ArticleActions.updateArticleSuccess, (state, article) => ({
    ...state,
    selectedArticle: undefined,
    saving: false,
    error: undefined,
    checkedTags: undefined,
  })),
  on(ArticleActions.updateArticleFail, (state, error) => ({
    ...state,
    error: error,
    saving: false,
    checkedTags: undefined,
  })),
  on(ArticleActions.deleteArticle, (state) => ({
    ...state,
    deleting: true,
  })),
  on(ArticleActions.deleteArticleSuccess, (state, article) => ({
    ...state,
    selectedArticle: undefined,
    deleting: false,
    error: undefined,
  })),
  on(ArticleActions.deleteArticle, (state, error) => ({
    ...state,
    error: error,
    deleting: false,
  })),
  on(ArticleActions.setSelectedArticle, (state, { article }) => ({
    ...state,
    selectedArticle: article,
  })),
  on(ArticleActions.setArticleFilters, (state, { filters }) => ({
    ...state,
    filters,
  })),
  on(ArticleActions.getTagsSuccess, (state, { tags }) => ({
    ...state,
    tags,
  })),
  on(ArticleActions.setCheckedTags, (state, { checkedTags }) => ({
    ...state,
    checkedTags,
  }))
);

export const getArticleFeature = createFeatureSelector<ArticleState>('article');
