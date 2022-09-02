import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  busy$: Observable<boolean>;

  private _busy: BehaviorSubject<boolean>;

  constructor() {
    this._busy = new BehaviorSubject<boolean>(false);
    this.busy$ = this._busy.asObservable();
  }

  start() {
    this._busy.next(true);
  }

  stop() {
    this._busy.next(false);
  }
}
