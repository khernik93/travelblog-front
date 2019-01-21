import { Injectable } from '@angular/core';

import { ApiClient } from '../../shared/clients/api.client';
import { AuthCredentials } from './auth.model';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(
    private apiClient: ApiClient
  ) { }

  signIn(credentials: AuthCredentials): Observable<any> {
    return this.apiClient.signIn(credentials);
  }

}
