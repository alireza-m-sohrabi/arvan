import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'arvan/config-provider.service';
import { SearchResult } from 'arvan/core/models/search-result';
import { map, Observable } from 'rxjs';
import { Article, ArticleFilters } from './article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articleEndPoint!: string;

  constructor(configService: ConfigService, private httpClient: HttpClient) {
    this.articleEndPoint = `${configService.environment?.api.core}/articles`;
  }

  search(filters: ArticleFilters): Observable<SearchResult<Article>> {
    return this.httpClient
      .get<{ articles: Article[]; articleCount: number }>(
        `${this.articleEndPoint}`,
        {
          params: this.getHttpParams(filters),
        }
      )
      .pipe(
        map((result) => ({
          items: result.articles,
          total: result.articleCount,
        }))
      );
  }

  create(article: Article): Observable<Article> {
    return this.httpClient
      .post<{ article: Article }>(`${this.articleEndPoint}`, { article })
      .pipe(map((result) => result.article));
  }

  update(article: Article, slug: string) {
    return this.httpClient
      .put<{ article: Article }>(`${this.articleEndPoint}/${slug}`, { article })
      .pipe(map((result) => result.article));
  }

  get(slug: string): Observable<Article> {
    return this.httpClient
      .get<{ article: Article }>(`${this.articleEndPoint}/${slug}`)
      .pipe(map((result) => result.article));
  }

  delete(slug: string) {
    return this.httpClient
      .delete<{ article: Article }>(`${this.articleEndPoint}/${slug}`)
      .pipe(map((result) => result.article));
  }

  private getHttpParams(filters: ArticleFilters) {
    let params = new HttpParams();

    const flattedFilters = { ...filters, ...filters.pagination } as any;

    delete flattedFilters.pagination;

    for (let key in flattedFilters) {
      const value = (flattedFilters as any)[key];

      if (value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    }

    return params;
  }
}
