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
      { path: '', component: ArticleListComponent },
      { path: './page/:page', component: ArticleListComponent },
      { path: 'create', component: ArticleEditComponent },
      { path: 'edit/:slug', component: ArticleEditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticleRoutingModule {}
