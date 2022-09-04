import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'arvan-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
