import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import * as authActions from './auth.actions';
import { AuthService } from '../auth.service';
import { AuthCredentials } from '../auth.model';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  @Effect()
  tryToSignIn$: Observable<any> = this.actions$
    .pipe(
      ofType(authActions.AuthActionTypes.TryToSignIn),
      switchMap((action: {credentials: AuthCredentials}) => {
        return this.authService.signIn(action.credentials)
          .pipe(
            catchError((httpErrorResponse: HttpErrorResponse) => {
              return this.handleSignInError(httpErrorResponse);
            }),
            tap(() => new authActions.SignIn()),
            tap(() => this.redirectToReturnUrl())
          )
      })
    );

  /**
   * Show particular notification and sign the user out
   * @param httpErrorResponse 
   */
  private handleSignInError(httpErrorResponse: HttpErrorResponse): Observable<any> {
    if (httpErrorResponse.status === 400) {
      //this.notificationService.setError("Invalid credentials");
    }
    return of(new authActions.SignOut());
  }

  /**
   * Navigate to the previous URL
   */
  private redirectToReturnUrl(): void {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.router.navigateByUrl(returnUrl);
  }

}
