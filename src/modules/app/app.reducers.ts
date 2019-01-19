import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';

interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const syncReducers: ActionReducerMap<AppState> = {
  router: routerReducer
};
