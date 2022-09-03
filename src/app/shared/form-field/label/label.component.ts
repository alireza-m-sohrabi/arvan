import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'arvan-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
