import { APP_INITIALIZER, Injectable } from '@angular/core';
import { ConfigService } from './config-provider.service';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor() {}

  load(configService: ConfigService) {
    return new Promise((resolve) => {
      configService.load().then(() => {
        resolve(0);
      });
    });
  }
}

export const appInitializerFactory =
  (initializer: AppInitializerService, configService: ConfigService) => () =>
    initializer.load(configService);

export const appInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: appInitializerFactory,
  multi: true,
  deps: [AppInitializerService, ConfigService],
};
