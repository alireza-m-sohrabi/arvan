import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'arvan-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
