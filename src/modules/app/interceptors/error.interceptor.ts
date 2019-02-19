import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';
import { SetError } from '../containers/notification/store/notification.actions';
import { SignOut } from '../../auth/store/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private errorMessage: string = 'Oops, something went terribly wrong!';

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: any) => {
          this.dispatchSpecificActions(error.status);
          return throwError(error);
        })
      );
  }

  private dispatchSpecificActions(status: number) {
    if (this.isError(status)) {
      this.store.dispatch(new SetError(this.errorMessage));
    }
    if (this.isNotAuthorized(status)) {
      this.store.dispatch(new SignOut());
    }
  }

  private isError(status: number) {
    return status === 0 || status >= 400;
  }

  private isNotAuthorized(status: number) {
    return status === 403;
  }

}
