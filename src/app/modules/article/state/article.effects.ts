import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LoadingService } from 'arvan/core/loading/loading.service';
import {
  catchError,
  finalize,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  throwError,
  withLatestFrom,
} from 'rxjs';
import { ArticleService } from '../core/article.service';
import { TagsService } from '../core/tags.service';
import * as ArticleActions from './article.actions';
import { ArticleState } from './article.reducer';
import * as ArticleSelectors from './article.selectors';
import * as fromRoot from 'arvan/state';
import { Router } from '@angular/router';
import { ArticleFilters } from '../core/article';

@Injectable({ providedIn: 'root' })
export class ArticleEffects {
  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.createArticle),
      tap(() => this.loadingService.start()),
      withLatestFrom(
        this.articleStore.select(ArticleSelectors.selectArticleFilters)
      ),
      switchMap(([{ article: body }, filters]) =>
        this.articleService.create(body).pipe(
          tap(() => this.goToListPage(filters)),
          mergeMap((article) => [
            ArticleActions.getArticles(),
            ArticleActions.getTags(),
            ArticleActions.createArticleSuccess(article),
            fromRoot.showSuccessToast({
              message: 'article created successfully',
              title: 'Well done!',
            }),
          ]),
          catchError((err) => of(ArticleActions.createArticleFail(err))),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.updateArticle),
      withLatestFrom(
        this.articleStore.select(ArticleSelectors.selectArticleFilters)
      ),
      tap(() => this.loadingService.start()),
      switchMap(([{ article: body, slug }, filters]) =>
        this.articleService.update(body, slug).pipe(
          tap(() => this.goToListPage(filters)),
          mergeMap((article) => [
            ArticleActions.getArticles(),
            ArticleActions.getTags(),
            ArticleActions.updateArticleSuccess(article),
            fromRoot.showSuccessToast({
              message: 'article updated successfully',
              title: 'Well done!',
            }),
          ]),
          catchError((err) => of(ArticleActions.updateArticleFail(err))),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.deleteArticle),
      tap(() => this.loadingService.start()),
      switchMap(({ slug }) =>
        this.articleService.delete(slug).pipe(
          mergeMap((article) => [
            ArticleActions.getArticles(),
            ArticleActions.deleteArticleSuccess(article),
            fromRoot.showSuccessToast({
              message: 'article deleted successfully',
              title: 'Well done!',
            }),
          ]),
          catchError((err) => of(ArticleActions.deleteArticleFail(err))),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  getArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.getArticles, ArticleActions.setArticleFilters),
      withLatestFrom(
        this.articleStore.select(ArticleSelectors.selectArticleFilters)
      ),
      tap(() => this.loadingService.start()),
      switchMap(([_, filters]) =>
        this.articleService.search(filters!).pipe(
          map((result) => ArticleActions.getArticlesSuccess(result)),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  getTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.getTags),
      tap(() => this.loadingService.start()),
      switchMap(() =>
        this.tagsService.search().pipe(
          map((tags) => ArticleActions.getTagsSuccess({ tags })),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  getCurrentArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArticleActions.getCurrentArticle),
      tap(() => this.loadingService.start()),
      switchMap(({ slug }) =>
        this.articleService.get(slug).pipe(
          map((article) => ArticleActions.setSelectedArticle({ article })),
          finalize(() => this.loadingService.stop())
        )
      )
    )
  );

  throwErrors$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ArticleActions.createArticleFail,
          ArticleActions.updateArticleFail,
          ArticleActions.deleteArticleFail
        ),
        switchMap((err) => throwError(() => err))
      ),
    { dispatch: false }
  );

  private goToListPage(filters: ArticleFilters) {
    const pageNumber = filters.pagination.pageNumber;

    let direction: string[] = ['articles'];

    if (pageNumber > 1) {
      direction.push('page', pageNumber.toString());
    }

    this.router.navigate(direction);
  }

  constructor(
    private actions$: Actions,
    private articleService: ArticleService,
    private articleStore: Store<ArticleState>,
    private loadingService: LoadingService,
    private tagsService: TagsService,
    private router: Router
  ) {}
}
