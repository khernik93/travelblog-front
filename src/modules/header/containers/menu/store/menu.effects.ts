import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { exhaustMap, map, switchMap, tap, takeUntil, take, filter } from 'rxjs/operators';
import { MenuActionTypes, SetTabs, SelectTab } from './menu.actions';
import { ApiClient } from '../../../../../shared/clients/api/api.client';
import { TabDTO } from '../../../../../shared/clients/api/api.model';
import { Store } from '@ngrx/store';
import { HeaderState } from '../../../store/header.reducers';
import { selectTabs } from './menu.selectors';

@Injectable()
export class MenuEffects {

  @Effect()
  selectTabById$: Observable<any> = this.actions$
    .pipe(
      ofType(MenuActionTypes.SelectTabById),
      switchMap((action: any) => (
        this.store.select(selectTabs)
          .pipe(
            map((tabs: TabDTO[]) => ({ tabId: action.id, tabs }))
          )
      )),
      map((result: {tabId: number, tabs: TabDTO[]}) => (
        result.tabId ?
          result.tabs.filter(tab => tab.id == result.tabId)[0] :
          result.tabs[0]
      )),
      map((tab: TabDTO) => new SelectTab(tab))
    );

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(MenuActionTypes.GetTabs),
      exhaustMap(() => this.apiClient.getTabs()),
      map((tabs: TabDTO[]) => new SetTabs(tabs))
    );

  constructor(
    private actions$: Actions,
    private apiClient: ApiClient,
    private store: Store<HeaderState>
  ) { }

}