import {
  APP_BOOTSTRAP_LISTENER,
  Inject,
  InjectionToken,
  Type,
} from '@angular/core';
import { EffectSources } from '@ngrx/effects';
// https://github.com/ngrx/platform/issues/931
// eslint-disable-next-line @typescript-eslint/naming-convention
export const BOOTSTRAP_EFFECTS = new InjectionToken('Bootstrap Effects');

export const bootstrapEffects = (
  effects: Type<any>[],
  sources: EffectSources
) => {
  return () => {
    effects.forEach((effect) => sources.addEffects(effect));
  };
};

export const createInstances = (...instances: any[]) => instances;

export const provideBootstrapEffects = (effects: Type<any>[]) => [
  effects,
  { provide: BOOTSTRAP_EFFECTS, deps: effects, useFactory: createInstances },
  {
    provide: APP_BOOTSTRAP_LISTENER,
    multi: true,
    useFactory: bootstrapEffects,
    deps: [[new Inject(BOOTSTRAP_EFFECTS)], EffectSources],
  },
];
