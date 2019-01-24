import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { of } from 'rxjs';

import { ApiClient } from '../../../src/shared/clients/api.client';
import { TestActions, getActions } from '../../utils/mocks/testActions';
import { AuthEffects } from '../../../src/modules/auth/store/auth.effects';
import { SharedStubs } from '../../utils/stubs/sharedStubs';
import { TryToSignIn, SignIn, SignOut } from '../../../src/modules/auth/store/auth.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthStubs } from './helpers/auth.stubs';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '../../utils/mocks/mockStore';
import { CookieService } from '../../../src/shared/services/cookie.service';
import { AppState } from '../../../src/modules/app/store/app.reducers';

describe('AuthEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let store: MockStore<AppState>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let router: jasmine.SpyObj<Router>;

  let actions: TestActions;
  let effects: AuthEffects;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    activatedRoute = AuthStubs.getActivatedRouteStub();
    router = AuthStubs.getRouterStub();
    store = SharedStubs.getMockStoreStub<AppState>();
    cookieService = AuthStubs.getCookieService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Store, useValue: store },
        { provide: CookieService, useValue: cookieService },
        { provide: Router, useValue: router }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN TryToSignIn action is dispatched
    THEN apiClient.signIn method should be executed
    AND SignIn action should be dispatched
    AND route should redirect to the return url
  `, () => {
    const action = new TryToSignIn({email: 'aaa', password: 'aaa'});
    const outcome = new SignIn();

    actions.stream = hot('-a', {a: action});
    const clientResponse = cold('-a|', { a: { data: '' } });
    const expected = cold('--b', { b: outcome });
    apiClient.signIn.and.returnValue(clientResponse);
    expect(effects.tryToSignIn$).toBeObservable(expected);
  });

  it(`
    WHEN TryToSignIn action is dispatched
    AND apiClient.signIn returns an error
    THEN SignOut action should be dispatched
  `, () => {
    const action = new TryToSignIn({email: 'aaa', password: 'aaa'});
    const outcome = new SignOut();

    actions.stream = hot('-a', {a: action});
    const clientErrorResponse = cold('-#|', {}, new Error());
    const expected = cold('--(b|)', { b: outcome });
    apiClient.signIn.and.returnValue(clientErrorResponse);
    expect(effects.tryToSignIn$).toBeObservable(expected);
  });

  it(`
    WHEN SignIn action is dispatched
    THEN router navigates to return URL
  `, (done) => {
    actions.stream = of(new SignIn());
    effects.signIn$
      .subscribe(() => {
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it(`
    WHEN SignOut action is dispatched
    THEN cookieService.removeCookie observable is returned
  `, (done) => {
    actions.stream = of(new SignOut());
    effects.signOut$
      .subscribe(() => {
        expect(cookieService.removeCookie).toHaveBeenCalledTimes(1);
        done();
      });
  });

});
