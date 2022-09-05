import { Article, ArticleFilters } from '../core/article';

export interface ArticleProps {
  articles?: Article[];
  saving: boolean;
  deleting: boolean;
  selectedArticle?: Article;
  slug?: string;
  tags?: string[];
  checkedTags?: string[];
}

export interface ArticleFilterProps {
  filters: ArticleFilters;
}
