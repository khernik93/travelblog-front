import { of } from "rxjs";

export class AuthStubs {

  static getRouterStub() {
    return jasmine.createSpyObj('Router', ['navigateByUrl']);
  }

  static getActivatedRouteStub() {
    return jasmine.createSpyObj('ActivatedRoute', ['snapshot']);
  }

  static getCookieService() {
    return jasmine.createSpyObj('CookieService', [
      'isCookieSet',
      'removeCookie'
    ]);
  }

};
