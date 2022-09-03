import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'arvan-button-spinner',
  templateUrl: './button-spinner.component.html',
  styleUrls: ['./button-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonSpinnerComponent implements OnInit {
  @Input() show: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
