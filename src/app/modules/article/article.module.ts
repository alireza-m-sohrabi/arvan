import { NgModule } from '@angular/core';
import { ArticleComponent } from './article.component';
import { SharedModule } from 'arvan/shared/shared.module';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleTagsComponent } from './article-tags/article-tags.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleService } from './core/article.service';
import { StoreModule } from '@ngrx/store';
import { articleReducer } from './state/article.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticleEffects } from './state/article.effects';
import { ArticleListComponent } from './article-list/article-list.component';
import { TagsService } from './core/tags.service';
import { ArticleGuard } from './core/article.guard';

@NgModule({
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    ArticleEditComponent,
    ArticleTagsComponent,
  ],
  imports: [
    SharedModule,
    ArticleRoutingModule,
    StoreModule.forFeature('article', articleReducer),
    EffectsModule.forFeature([ArticleEffects]),
  ],
  providers: [ArticleService, TagsService, ArticleGuard],
})
export class ArticleModule {}
