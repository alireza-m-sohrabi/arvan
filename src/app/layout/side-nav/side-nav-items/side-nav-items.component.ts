import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'arvan-side-nav-items',
  templateUrl: './side-nav-items.component.html',
  styleUrls: ['./side-nav-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavItemsComponent implements OnInit {
  menuItems = [
    { name: 'All Articles', path: '/articles' },
    { name: 'New Article', path: '/articles/create' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
