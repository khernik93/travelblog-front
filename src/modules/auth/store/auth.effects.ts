import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as authActions from './auth.actions';
import { AuthCredentials } from '../auth.model';
import { ApiClient } from '../../../shared/clients/api.client';
import { AppState } from '../../app/store/app.reducers';
import { SetError } from '../../app/components/notification/store/notification.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  tryToSignIn$: Observable<any> = this.actions$
    .pipe(
      ofType(authActions.AuthActionTypes.TryToSignIn),
      switchMap((action: {credentials: AuthCredentials}) => {
        return this.apiClient.signIn(action.credentials)
          .pipe(
            map(() => new authActions.SignIn()),
            tap(() => {
              this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/');
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) {
                this.store.dispatch(new SetError("Invalid credentials"));
              }
              return of(new authActions.SignOut());
            })
          )
      })
    );

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClient,
    private store: Store<AppState>
  ) { }

}
