import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import { Store } from '@ngrx/store';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { EditPostEffects } from '../../../../../src/modules/admin/containers/editPost/store/editPost.effects';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { EditPost, EditPostSuccess } from '../../../../../src/modules/admin/containers/editPost/store/editPost.actions';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { PostsService } from '../../../../../src/modules/admin/services/posts.service';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';

describe('EditPostEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let postsService: jasmine.SpyObj<PostsService>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: EditPostEffects;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = SharedStubs.getMockStoreStub<HeaderState>();
    postsService = AdminStubs.postsService();

    TestBed.configureTestingModule({
      providers: [
        EditPostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: PostsService, useValue: postsService },
        { provide: Store, useValue: store }
      ]
    });
  });

  beforeEach(() => {
    actions = TestBed.get(Actions);
    effects = TestBed.get(EditPostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN EditPost action is dispatched
    THEN EditPostSuccess action is dispatched
  `, () => {
    const action = new EditPost(null);
    const outcome = new EditPostSuccess();
    actions.stream = hot('-a', {a: action});
    const serviceResponse = hot('-a', { a: null});
    const apiResponse = hot('--b|', { b: null });
    const expected = hot('--c', { c: outcome });
    postsService.transformPostIntoPostContentDTO.and.returnValue(serviceResponse);
    apiClient.updatePost.and.returnValue(apiResponse);
    expect(effects.editPost$).toBeObservable(expected);
  });

});
