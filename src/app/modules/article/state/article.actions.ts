import { createAction, props } from '@ngrx/store';
import { ArvanError } from 'arvan/core/error/error-model';
import { SearchResult } from 'arvan/core/models/search-result';
import { ErrorProps } from 'arvan/state/models/state.models';
import { Article } from '../core/article';
import { ArticleFilterProps } from './model';

const prefix = '[Article]';

export const getCurrentArticle = createAction(
  `${prefix} Get Current Article`,
  props<{ slug: string }>()
);

export const getArticles = createAction(`${prefix} Get`);

export const getArticlesSuccess = createAction(
  `${prefix} Get Success`,
  props<SearchResult<Article>>()
);

export const createArticle = createAction(
  `${prefix} Create`,
  props<{ article: Article }>()
);

export const createArticleSuccess = createAction(
  `${prefix} Create Success`,
  props<Article>()
);

export const createArticleFail = createAction(
  `${prefix} Create Fail`,
  props<ErrorProps<any>>()
);

export const updateArticle = createAction(
  `${prefix} Update`,
  props<{ article: Article; slug: string }>()
);

export const updateArticleSuccess = createAction(
  `${prefix} Update Success`,
  props<Article>()
);

export const updateArticleFail = createAction(
  `${prefix} Update Fail`,
  props<ErrorProps<any>>()
);

export const deleteArticle = createAction(
  `${prefix} Delete`,
  props<{ slug: string }>()
);

export const deleteArticleSuccess = createAction(
  `${prefix} Delete Success`,
  props<Article>()
);

export const deleteArticleFail = createAction(
  `${prefix} Delete Fail`,
  props<ErrorProps<any>>()
);

export const setArticleFilters = createAction(
  `${prefix} Set Filters`,
  props<ArticleFilterProps>()
);

export const getTags = createAction(`${prefix} Get Tags`);

export const getTagsSuccess = createAction(
  `${prefix} Get Tags Success`,
  props<{ tags: string[] }>()
);

export const setCheckedTags = createAction(
  `${prefix} Set Checked Tags`,
  props<{ checkedTags: string[] }>()
);

export const setSelectedArticle = createAction(
  `${prefix} Set Selected`,
  props<{ article: Article | undefined }>()
);
