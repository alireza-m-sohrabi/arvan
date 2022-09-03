import { APP_INITIALIZER, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'env/environment';
import {
  BehaviorSubject,
  catchError,
  firstValueFrom,
  Observable,
  Subject,
  tap,
  throwError,
} from 'rxjs';

export interface EnvironmentConfig {
  api: {
    core: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  environment?: EnvironmentConfig;
  isInit: Observable<boolean>;

  private _isInit: BehaviorSubject<boolean>;

  constructor(private httpClient: HttpClient) {
    this._isInit = new BehaviorSubject<boolean>(false);
    this.isInit = this._isInit.asObservable();
  }

  load = () =>
    firstValueFrom(
      this.httpClient
        .get<EnvironmentConfig>(
          `assets/environments/config.${environment.name}.json?r=${Date.now()}`
        )
        .pipe(
          tap((config) => {
            this.environment = config;
            this._isInit.next(true);
          }),

          catchError((err) => {
            return throwError(() => err);
          })
        )
    );
}
