import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { MenuActionTypes, SetTabs } from './menu.actions';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { TabDTO } from '../../../../../shared/clients/api/api.model';

@Injectable()
export class MenuEffects {

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(MenuActionTypes.GetTabs),
      exhaustMap(() => this.apiClient.getTabs()),
      map((tabs: TabDTO[]) => new SetTabs(tabs))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient
  ) { }

}
