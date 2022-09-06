import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  currentTitle: Observable<string>;

  private _currentTitle: BehaviorSubject<string>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this._currentTitle = new BehaviorSubject('');
    this.currentTitle = this._currentTitle.asObservable();
  }

  boot() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this._currentTitle.next(data['title']);
      });
  }
}
