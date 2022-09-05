import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { ArticleTagsComponent } from '../article-tags/article-tags.component';
import * as fromArticle from 'article/state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'arvan-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditComponent implements OnInit, OnDestroy {
  @ViewChild(ArticleTagsComponent) tagComponent!: ArticleTagsComponent;

  stop$: Subject<boolean>;
  saving$!: Observable<boolean>;
  form: FormGroup;
  slug?: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private articleStore: Store<fromArticle.ArticleState>,
    route: ActivatedRoute
  ) {
    this.stop$ = new Subject();

    route.paramMap
      .pipe(
        tap((params) => (this.slug = params.get('slug'))),
        takeUntil(this.stop$)
      )
      .subscribe();

    this.form = this.generateForm();
  }

  ngOnInit(): void {
    this.connectState();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      this.form.updateValueAndValidity();

      return;
    }

    const body = {
      ...this.form.value,
      tagList: this.tagComponent.getCheckedTags(),
    };

    if (!!this.slug) {
      this.articleStore.dispatch(
        fromArticle.updateArticle({ article: body, slug: this.slug })
      );
    } else {
      this.articleStore.dispatch(fromArticle.createArticle({ article: body }));
    }
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();
  }

  private connectState() {
    this.saving$ = this.articleStore.select(fromArticle.selectArticleSaving);

    if (this.slug) {
      this.articleStore
        .select(fromArticle.selectSelectedArticle)
        .pipe(
          tap((article) => {
            if (!article) {
              this.articleStore.dispatch(
                fromArticle.getCurrentArticle({ slug: this.slug! })
              );
            } else {
              this.articleStore.dispatch(
                fromArticle.setCheckedTags({ checkedTags: article.tagList })
              );

              this.form.patchValue(article!);
            }
          }),
          takeUntil(this.stop$)
        )
        .subscribe();
    }
  }

  private generateForm() {
    return this.formBuilder.group({
      title: [undefined, Validators.required],
      description: [undefined, Validators.required],
      body: [undefined, Validators.required],
    });
  }
}
