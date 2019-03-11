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

}
