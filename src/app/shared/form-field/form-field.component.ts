import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';
import { InputDirective } from './input.directive';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'arvan-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnInit {
  @Input() control?: AbstractControl;

  @ContentChild(LabelComponent, { read: ElementRef<HTMLElement>, static: true })
  label?: ElementRef<HTMLElement>;

  @ContentChild(InputDirective, { read: ElementRef, static: true })
  inputElement?: ElementRef<any>;

  showErrors!: boolean;

  constructor(private cd: ChangeDetectorRef) {
    this.showErrors = false;
  }

  ngOnInit(): void {
    this.connectFormStatus();
  }

  connectFormStatus() {
    this.inputElement?.nativeElement.addEventListener('blur', () => {
      this.check();
    });

    if (this.control) {
      this.control!.statusChanges.pipe(
        startWith(this.control.status),
        map(() => {
          this.check();
          return [];
        })
      ).subscribe();
    }
  }

  private check() {
    this.showErrors = !!this.control?.invalid && !!this.control?.touched;

    if (this.showErrors) {
      this.label?.nativeElement.classList.add('text-danger');
    } else {
      this.label?.nativeElement.classList.remove('text-danger');
    }

    this.cd.detectChanges();
  }
}
