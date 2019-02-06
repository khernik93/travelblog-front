import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app.reducers';
import { SetError } from '../components/notification/store/notification.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private errorMessage: string = 'Oops, something went terribly wrong!';

  constructor(
    private store: Store<AppState>
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: any) => {
          if (this.isCriticalError(httpErrorResponse.status)) {
            this.store.dispatch(new SetError(this.errorMessage));
          }
          throw httpErrorResponse;
        })
      );
  }

  private isCriticalError(status: number) {
    return status === 0 || status >= 500;
  }

}
