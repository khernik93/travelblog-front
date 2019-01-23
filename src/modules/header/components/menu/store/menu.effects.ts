import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as menuActions from './menu.actions';
import { ApiClient } from '../../../../../shared/clients/api.client';
import { ApiResponse, Tab } from '../../../../../shared/clients/api.model';

@Injectable()
export class MenuEffects {

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(menuActions.MenuActionTypes.GetTabs),
      switchMap(() => {
        return this.apiClient.getTabs()
          .pipe(
            map((response: ApiResponse<Tab[]>) => {
              return new menuActions.SetTabs(response.data);
            })
          );
      })
    );

}