import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, defer } from 'rxjs';
import { catchError, map, tap, exhaustMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import get from 'lodash-es/get';
import { AuthCredentials } from '../auth.model';
import { ApiClient } from '../../../shared/clients/api/api.client';
import { AppState } from '../../app/store/app.reducers';
import { SetError } from '../../app/components/notification/store/notification.actions';
import { CookieService } from '../../../shared/services/cookie.service';
import constants from '../../../config/constants';
import { 
  SetAuthenticated,
  SignIn, 
  SignOut,
  AuthActionTypes
} from './auth.actions';

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
            catchError((response: HttpErrorResponse) => of(new SignOut()))
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
      tap(() => this.cookieService.removeCookie(this.authCookieKey))
    );

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private apiClient: ApiClient,
    private store: Store<AppState>,
    private cookieService: CookieService
  ) { }

  private authCookieKey: string = constants.auth.cookieKey;

}
