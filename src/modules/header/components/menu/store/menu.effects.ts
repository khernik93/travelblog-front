import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { exhaustMap, concatMap } from 'rxjs/operators';
import { MenuActionTypes, SetTabs, SelectTab } from './menu.actions';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { TabDTO } from '../../../../../shared/clients/api/api.model';

@Injectable()
export class MenuEffects {

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(MenuActionTypes.GetTabs),
      exhaustMap(() => (
        this.apiClient.getTabs()
          .pipe(
            concatMap((tabs: TabDTO[]) => ([
              new SetTabs(tabs),
              new SelectTab(tabs[0])
            ]))
          )
      ))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
