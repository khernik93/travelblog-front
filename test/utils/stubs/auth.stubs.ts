import { AuthService } from "../../../src/modules/auth/auth.service";

export class AuthStubs {

  static activatedRoute() {
    return jasmine.createSpyObj('ActivatedRoute', {
      snapshot: {
        queryParams: {}
      }
    });
  }

  static cookieService() {
    return jasmine.createSpyObj('CookieService', [
      'isCookieSet',
      'removeCookie'
    ]);
  }

  static authService(): jasmine.SpyObj<AuthService> {
    return jasmine.createSpyObj('AuthService', ['cookieKey']);
  }

}
