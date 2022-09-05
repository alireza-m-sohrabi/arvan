import { NgModule } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [ButtonsModule, BsDropdownModule.forRoot(), ModalModule.forRoot()],
  exports: [ButtonsModule, BsDropdownModule, ModalModule],
})
export class NgxBootstrapModule {}
