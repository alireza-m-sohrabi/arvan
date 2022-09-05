import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatestWith, Observable, Subject, takeUntil, tap } from 'rxjs';
import * as fromArticle from '../state';

@Component({
  selector: 'arvan-article-tags',
  templateUrl: './article-tags.component.html',
  styleUrls: ['./article-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleTagsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  tags$: Observable<any>;
  stop$: Subject<any>;

  constructor(
    private store: Store<fromArticle.ArticleState>,
    private formBuilder: FormBuilder
  ) {
    this.stop$ = new Subject();

    this.form = this.formBuilder.group({
      tags: this.formBuilder.array([]),
      title: [undefined],
    });

    this.tags$ = this.tagsFormArray.valueChanges;
  }

  getCheckedTags() {
    const formArray = this.form.get('tags') as FormArray;

    return formArray.controls
      .filter((c) => !!c.get('checked')?.value)
      .map((c) => c.get('title')?.value);
  }

  setCheckedTags(tags: string[]) {
    tags.forEach((tag) => {
      this.tagsFormArray.controls
        .filter((c) => c.get('title')?.value === tag)
        .forEach((fc) => fc.get('checked')?.setValue(true));
    });
  }

  onEnter() {
    const titleControl = this.form.get('title');
    const title = titleControl?.value;

    if (!title) {
      return;
    }

    this.tagsFormArray.push(
      this.formBuilder.group({
        checked: true,
        title,
      })
    );

    titleControl.setValue('');
  }

  ngOnInit(): void {
    this.connectState();
  }

  ngOnDestroy(): void {
    this.stop$.next(true);
    this.stop$.complete();

    this.store.dispatch(fromArticle.setCheckedTags({ checkedTags: [] }));
  }

  private connectState() {
    this.store
      .select(fromArticle.selectTags)
      .pipe(
        combineLatestWith(this.store.select(fromArticle.selectCheckedTags)),
        tap(([tags, checkedTags]) => {
          if (
            tags &&
            tags.length > 0 &&
            this.tagsFormArray.controls.length === 0
          ) {
            tags.forEach((tag) =>
              this.tagsFormArray.push(
                this.formBuilder.group({
                  checked: [false],
                  title: [tag],
                })
              )
            );

            setTimeout(() => {
              this.tagsFormArray.updateValueAndValidity({
                emitEvent: true,
                onlySelf: true,
              });
            }, 0);
          }

          if (checkedTags && this.tagsFormArray.controls.length > 0) {
            this.setCheckedTags(checkedTags!);
          }
        }),
        takeUntil(this.stop$)
      )
      .subscribe();
  }

  private get tagsFormArray() {
    return this.form.get('tags') as FormArray;
  }
}
