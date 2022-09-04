import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import { SharedModule } from 'arvan/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutComponent } from './layout.component';
import { SideNavItemsComponent } from './side-nav/side-nav-items/side-nav-items.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ContentComponent,
    TopNavComponent,
    SideNavComponent,
    SideNavItemsComponent,
  ],
  imports: [SharedModule, RouterModule],
})
export class LayoutModule {}
