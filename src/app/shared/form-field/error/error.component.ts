import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'arvan-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnInit {
  @Input() errors?: ValidationErrors | null;

  constructor() {}

  ngOnInit(): void {}
}
