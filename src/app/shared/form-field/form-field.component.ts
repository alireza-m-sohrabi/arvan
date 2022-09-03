import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'arvan-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
  @Input() control?: AbstractControl;

  @ContentChild(LabelComponent, { read: ElementRef<HTMLElement> })
  label?: ElementRef<HTMLElement>;

  errors$?: Observable<ValidationErrors | null>;

  @ContentChild(HTMLInputElement) inputElement?: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {
    this.errors$ = this.connectFormStatus();
  }

  connectFormStatus() {
    return this.control!.statusChanges.pipe(
      map((status) => {
        if (status === 'INVALID') {
          this.label?.nativeElement.classList.add('text-danger');

          return this.control!.errors;
        } else {
          this.label?.nativeElement.classList.remove('text-danger');
        }

        return [];
      })
    );
  }
}
