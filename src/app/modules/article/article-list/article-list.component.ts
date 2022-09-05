import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromArticle from 'article/state';
import { ConfirmationDialogService } from 'arvan/core/confirmation/confirmation-dialog.service';
import { Pagination } from 'arvan/core/models/pagination-model';
import { map, Observable } from 'rxjs';
import { Article } from '../core/article';

@Component({
  selector: 'arvan-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
  articles$!: Observable<any[]>;
  pagination$!: Observable<Pagination>;
  deleting$!: Observable<boolean>;

  displayedColumns: { [key: string]: string } = {
    title: 'Title',
    excerpt: 'Excerpt',
    tagList: 'Tags',
    authorName: 'Author',
    updatedAt: 'Created',
  };

  constructor(
    private articleStore: Store<fromArticle.ArticleState>,
    private router: Router,
    private confirmationDialog: ConfirmationDialogService
  ) {}

  ngOnInit(): void {
    this.connectState();
  }

  onEdit(article: Article) {
    this.articleStore.dispatch(fromArticle.setSelectedArticle({ article }));

    this.router.navigate(['articles', 'edit', article.slug!]);
  }

  onDelete(article: Article) {
    this.confirmationDialog
      .confirm('Delete Article', 'Are you sure to delete article!')
      .subscribe((result) => {
        if (result) {
          this.articleStore.dispatch(
            fromArticle.deleteArticle({ slug: article.slug! })
          );
        }
      });
  }

  private connectState() {
    this.articles$ = this.articleStore.select(fromArticle.selectArticles).pipe(
      map((articles) => {
        if (articles) {
          return articles.map((article) => ({
            ...article,
            authorName: article.author?.username,
            excerpt: article.body.substring(0, 20) + ' ...',
            updatedAt: article.updatedAt
              ? new Date(article.updatedAt)?.toDateString()
              : '',
          }));
        }

        return [];
      })
    );

    this.pagination$ = this.articleStore
      .select(fromArticle.selectArticlePagination)
      .pipe(map((pagination) => pagination!));

    this.deleting$ = this.articleStore.select(
      fromArticle.selectArticleDeleting
    );
  }
}
