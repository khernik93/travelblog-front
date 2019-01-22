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

const FALLBACK_URI = '/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AuthState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated()
      .pipe(
        map((isAuthenticated: boolean) => {
          if (isAuthenticated) {
            return true;
          }

          this.router.navigate([FALLBACK_URI], { queryParams: { returnUrl: state.url } });
          return false;
        })
      );
  }

  private isAuthenticated() {
    return this.store.select(selectIsAuthenticated);
  }
  
}
