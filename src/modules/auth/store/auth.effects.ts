import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { switchMap, catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import * as authActions from './auth.actions';
import { AuthCredentials } from '../auth.model';
import { ApiClient } from '../../../shared/clients/api.client';
import { AppState } from '../../app/store/app.reducers';
import { SetError } from '../../app/components/notification/store/notification.actions';
import { CookieService } from '../../../shared/services/cookie.service';

const AUTH_COOKIE = 'SESSIONID';

@Injectable()
export class AuthEffects {

  @Effect()
  init$: Observable<any> = defer(() => {
    const isAuthenticated = this.cookieService.isCookieSet(AUTH_COOKIE);
    return of(new authActions.SetAuthenticated(isAuthenticated));
  });

  @Effect()
  tryToSignIn$: Observable<any> = this.actions$
    .pipe(
      ofType(authActions.AuthActionTypes.TryToSignIn),
      exhaustMap((action: {credentials: AuthCredentials}) => {
        return this.apiClient.signIn(action.credentials);
      }),
      map(() => new authActions.SignIn()),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.store.dispatch(new SetError("Invalid credentials"));
        }
        return of(new authActions.SignOut());
      })
    );

  @Effect()
  signIn$: Observable<any> = this.actions$
    .pipe(
      tap(() => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.router.navigateByUrl(returnUrl || '/');
      })
    );

  @Effect()
  signOut$: Observable<any> = this.actions$
    .pipe(
      ofType(authActions.AuthActionTypes.SignOut),
      exhaustMap(() => of(this.cookieService.removeCookie(AUTH_COOKIE)))
    );

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClient,
    private store: Store<AppState>,
    private cookieService: CookieService
  ) { }

}
