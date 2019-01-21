import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import * as menuActions from './menu.actions';
import { MenuService } from './menu.service';

@Injectable()
export class MenuEffects {

  constructor(
    private actions$: Actions,
    private menuService: MenuService
  ) { }

  @Effect()
  getTabs$: Observable<any> = this.actions$
    .pipe(
      ofType(menuActions.MenuActionTypes.GetTabs),
      switchMap(() => {
        return this.menuService.getTabs()
          .pipe(
            map((tabs: string[]) => new menuActions.SetTabs(tabs))
          );
      })
    );

}
