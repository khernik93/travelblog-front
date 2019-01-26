import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import get from 'lodash-es/get';

import { AppState } from '../store/app.reducers';
import { SetError } from '../components/notification/store/notification.actions';

const DEFAULT_ERROR_MESSAGE = 'Oops, something went terribly wrong!';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: any) => {
          if (this.isCriticalError(httpErrorResponse.status)) {
            const message = get(httpErrorResponse, 'error.error') || DEFAULT_ERROR_MESSAGE;
            this.store.dispatch(new SetError(message));
          }
          return of(httpErrorResponse);
        })
      );

  }

  private isCriticalError(status: number) {
    return status === 0 || status >= 500;
  }

}
