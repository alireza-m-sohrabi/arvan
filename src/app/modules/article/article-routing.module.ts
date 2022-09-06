import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article.component';
import { ArticleGuard } from './core/article.guard';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    canActivate: [ArticleGuard],
    children: [
      {
        path: '',
        component: ArticleListComponent,
        data: { title: 'All Posts' },
      },
      {
        path: './page/:page',
        component: ArticleListComponent,
        data: { title: 'All Posts' },
      },
      {
        path: 'create',
        component: ArticleEditComponent,
        data: { title: 'New Article' },
      },
      {
        path: 'edit/:slug',
        component: ArticleEditComponent,
        data: { title: 'Edit Article' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
