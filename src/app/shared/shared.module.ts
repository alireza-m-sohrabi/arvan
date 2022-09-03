import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapModule } from './ngx-bootsrap.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './form-field/error/error.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { LabelComponent } from './form-field/label/label.component';
import { ButtonLoadingDirective } from './directives/button-loading.directive';
import { ButtonSpinnerComponent } from './button-spinner/button-spinner.component';

@NgModule({
  declarations: [
    ErrorComponent,
    FormFieldComponent,
    LabelComponent,
    ButtonLoadingDirective,
    ButtonSpinnerComponent,
  ],
  imports: [CommonModule, NgxBootstrapModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    NgxBootstrapModule,
    ReactiveFormsModule,
    ErrorComponent,
    FormFieldComponent,
    LabelComponent,
    ButtonLoadingDirective,
    ButtonSpinnerComponent,
  ],
})
export class SharedModule {}
