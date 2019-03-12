import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import get from 'lodash-es/get';
import { AuthCredentials } from '../auth.model';
import { ApiClient } from '../../../shared/clients/api/api.client';
import { CookieService } from '../../../shared/services/cookie.service';

import { 
  SetAuthenticated,
  SignIn,
  AuthActionTypes,
  SignInError
} from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  init$: Observable<any> = defer(() => {
    const isAuthenticated = this.cookieService.isCookieSet(this.authCookieKey);
    return of(new SetAuthenticated(isAuthenticated));
  });

  @Effect()
  tryToSignIn$: Observable<any> = this.actions$
    .pipe(
      ofType(AuthActionTypes.TryToSignIn),
      exhaustMap((action: {credentials: AuthCredentials}) => (
        this.apiClient.signIn(action.credentials)
          .pipe(
            map(() => new SignIn()),
            catchError(() => of(new SignInError()))
          )
      ))
    );

  @Effect({dispatch: false})
  signIn$: Observable<any> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignIn),
      tap(() => {
        const returnUrl = get(this.route, 'snapshot.queryParams.returnUrl');
        this.router.navigateByUrl(returnUrl || '');
      })
    );

  @Effect({dispatch: false})
  signOut$: Observable<any> = this.actions$
    .pipe(
      ofType(AuthActionTypes.SignOut),
      tap(() => this.cookieService.removeCookie(this.authCookieKey)),
      tap(() => this.router.navigateByUrl(''))
    );

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClient,
    private cookieService: CookieService,
    private authService: AuthService
  ) { }

  private authCookieKey: string = this.authService.cookieKey;

}
