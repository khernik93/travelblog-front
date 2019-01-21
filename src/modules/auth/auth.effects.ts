import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as authActions from './auth.actions';
import { AuthService } from './auth.service';
import { AuthCredentials } from './auth.model';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }

  @Effect()
  tryToSignIn$: Observable<any> = this.actions$
    .pipe(
      ofType(authActions.AuthActionTypes.TryToSignIn),
      switchMap((action: {credentials: AuthCredentials}) => {
        return this.authService.signIn(action.credentials)
          .pipe(
            map(() => new authActions.SignIn())
          );
      })
    );

}
