import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'arvan/state';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'arvan-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent implements OnInit {
  username$!: Observable<string>;

  constructor(private appStore: Store<fromRoot.AppState>) {}

  ngOnInit(): void {
    this.username$ = this.appStore
      .select(fromRoot.selectCurrentUser)
      .pipe(map((user) => user?.username || ''));
  }
}
