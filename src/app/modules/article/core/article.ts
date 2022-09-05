import { Pagination } from 'arvan/core/models/pagination-model';
import { User } from 'arvan/core/user/user';

export interface Article {
  title: string;
  description: string;
  body: string;
  tagList: string[];
  author?: User;
  updatedAt?: Date;
  slug?: string;
}

export interface ArticleFilters {
  author?: string;
  favorited?: string;
  pagination: Pagination;
}
