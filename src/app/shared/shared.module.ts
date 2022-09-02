import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootsrap.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxBootstrapModule],
  exports: [CommonModule, NgxBootstrapModule],
})
export class SharedModule {}
