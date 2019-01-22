import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiClient } from '../../shared/clients/api.client';
import { AuthCredentials } from './auth.model';
import { ApiResponse } from '../../shared/clients/api.model';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { selectIsAuthenticated } from './store/auth.selectors';

@Injectable()
export class AuthService {

  AUTH_COOKIE_KEY = 'SESSIONID';

  constructor(
    private apiClient: ApiClient,
    private store: Store<AuthState>
  ) { }

  signIn(credentials: AuthCredentials): Observable<ApiResponse<void>> {
    return this.apiClient.signIn(credentials);
  }

  /**
   * Check is the authentication cookie is set, and assume the user is
   * authenticated if it is
   */
  isAuthenticated(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated);
  }

}
