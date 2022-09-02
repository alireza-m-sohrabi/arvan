import { APP_INITIALIZER, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'env/environment';
import { tap } from 'rxjs';

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

  constructor(private httpClient: HttpClient) {}

  load() {
    return this.httpClient
      .get<EnvironmentConfig>(
        `assets/environments/config.${environment.name}.json?r=${Date.now()}`
      )
      .pipe(tap((config) => (this.environment = config)));
  }
}

export const configFactory = (config: ConfigService) => () => {
  config.load();
};

export const configProvider = {
  provide: APP_INITIALIZER,
  useFactory: configFactory,
  deps: [ConfigService],
  multi: true,
};
