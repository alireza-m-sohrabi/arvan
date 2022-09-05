import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromArticle from 'article/state';

@Injectable({
  providedIn: 'root',
})
export class ArticleGuard implements CanActivate {
  constructor(private articleStore: Store<fromArticle.ArticleState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.articleStore.dispatch(fromArticle.getArticles());
    this.articleStore.dispatch(fromArticle.getTags());

    return true;
  }
}
