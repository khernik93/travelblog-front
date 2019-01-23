import { Injectable } from '@angular/core';
import { 
  Router, 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot 
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.reducer';
import { selectIsAuthenticated } from '../store/auth.selectors';

const AUTH_PATH = '/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated(state);
  }

  private isAuthenticated(state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsAuthenticated)
      .pipe(
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) return true;
          this.router.navigate([AUTH_PATH], { queryParams: { returnUrl: state.url } });
          return false;
        })
      );
  }
  
}
