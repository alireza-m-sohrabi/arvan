import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ButtonSpinnerComponent } from '../button-spinner/button-spinner.component';

@Directive({
  selector: '[arvanButtonLoading]',
})
export class ButtonLoadingDirective implements AfterViewInit {
  @Input() set arvanButtonLoading(value: boolean | undefined | null) {
    if (value) {
      this.spinner.setInput('show', true);

      this.buttonElement.setAttribute('disabled', 'true');
      this.buttonElement.classList.add('loading');
    } else {
      this.buttonElement.removeAttribute('disabled');
      this.buttonElement.classList.remove('loading');

      this.spinner.setInput('show', false);
    }
  }

  private buttonElement: HTMLElement;
  private spinner!: ComponentRef<ButtonSpinnerComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {
    this.viewContainerRef.createEmbeddedView(this.templateRef);

    this.buttonElement =
      this.viewContainerRef.element.nativeElement.previousElementSibling;

    this.buttonElement.style.position = 'relative';

    this.spinner = this.viewContainerRef.createComponent(
      ButtonSpinnerComponent
    );
  }

  ngAfterViewInit(): void {
    this.buttonElement.appendChild(this.spinner.location.nativeElement);
  }
}
