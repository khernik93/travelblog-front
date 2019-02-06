import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, exhaustMap } from 'rxjs/operators';
import { MenuActionTypes, SetTabs } from './menu.actions';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { ApiResponse, Tab } from '../../../../../shared/clients/api/api.model';

@Injectable()
export class MenuEffects {

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(MenuActionTypes.GetTabs),
      exhaustMap(() => (
        this.apiClient.getTabs()
          .pipe(
            map((response: ApiResponse<Tab[]>) => new SetTabs(response))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
