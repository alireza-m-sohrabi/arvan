import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'arvan-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
