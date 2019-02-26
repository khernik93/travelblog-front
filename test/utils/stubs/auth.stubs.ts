export class AuthStubs {

  static router() {
    return jasmine.createSpyObj('Router', ['navigateByUrl']);
  }

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

}
