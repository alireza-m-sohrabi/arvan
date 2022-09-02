import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { provideBootstrapEffects } from './bootstrap.effect';
import { appEffects } from './effects';
import { appReducers } from './reducers';
import * as UserActions from './auth/auth.actions';

function reset(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action.type === UserActions.logoutUser.type) {
      return reducer({}, action);
    }

    return reducer(state, action);
  };
}

const metaReducers: MetaReducer<any>[] = [reset];

@NgModule({
  imports: [
    StoreModule.forRoot(appReducers, { metaReducers }),
    EffectsModule.forRoot(),
  ],
  providers: [provideBootstrapEffects([...appEffects])],
})
export class AppStateModule {}
