import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';

import * as fromHeader from '../header/header.reducer';
import * as fromContent from '../content/content.reducer';

export const syncReducers = {
  router: routerReducer,
  header: fromHeader.headerReducer,
  content: fromContent.contentReducer
};

interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  header: fromHeader.HeaderState;
  content: fromContent.ContentState;
}
