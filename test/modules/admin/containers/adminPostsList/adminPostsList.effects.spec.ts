import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { Store } from '@ngrx/store';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { PostsService } from '../../../../../src/modules/admin/services/posts.service';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';
import { AdminPostsListEffects } from '../../../../../src/modules/admin/containers/adminPostsList/store/adminPostsList.effects';
import { DeletePost, DeletePostSuccess } from '../../../../../src/modules/admin/containers/adminPostsList/store/adminPostsList.actions';

describe('AdminPostsListEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let postsService: jasmine.SpyObj<PostsService>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: AdminPostsListEffects;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = SharedStubs.getMockStoreStub<HeaderState>();
    postsService = AdminStubs.postsService();

    TestBed.configureTestingModule({
      providers: [
        AdminPostsListEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: PostsService, useValue: postsService },
        { provide: Store, useValue: store }
      ]
    });
  });

  beforeEach(() => {
    actions = TestBed.get(Actions);
    effects = TestBed.get(AdminPostsListEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN DeletePost action is dispatched
    THEN DeletePostSuccess action is dispatched
  `, () => {
    const action = new DeletePost(null);
    const outcome = new DeletePostSuccess();
    actions.stream = hot('-a', {a: action});
    const apiResponse = cold('-b|', { b: null });
    const expected = cold('--c', { c: outcome });
    apiClient.deletePost.and.returnValue(apiResponse);
    expect(effects.deletePost$).toBeObservable(expected);
  });

});
