import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot } from 'jasmine-marbles';
import { Store } from '@ngrx/store';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { AddNewPostEffects } from '../../../../../src/modules/admin/containers/addNewPost/store/addNewPost.effects';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { AddNewPost, AddNewPostSuccess } from '../../../../../src/modules/admin/containers/addNewPost/store/addNewPost.actions';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { PostsService } from '../../../../../src/modules/admin/services/posts.service';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';

describe('AddNewPostEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let postsService: jasmine.SpyObj<PostsService>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: AddNewPostEffects;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = SharedStubs.getMockStoreStub<HeaderState>();
    postsService = AdminStubs.postsService();

    TestBed.configureTestingModule({
      providers: [
        AddNewPostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: PostsService, useValue: postsService },
        { provide: Store, useValue: store }
      ]
    });
  });

  beforeEach(() => {
    actions = TestBed.get(Actions);
    effects = TestBed.get(AddNewPostEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN AddNewPost action is dispatched
    THEN AddNewPostSuccess action is dispatched
  `, () => {
    const action = new AddNewPost(null);
    const outcome = new AddNewPostSuccess();
    actions.stream = hot('-a', {a: action});
    const serviceResponse = hot('-a', { a: null});
    const apiResponse = hot('--b|', { b: null });
    const expected = hot('--c', { c: outcome });
    postsService.transformPostIntoPostContentDTO.and.returnValue(serviceResponse);
    apiClient.addNewPost.and.returnValue(apiResponse);
    expect(effects.addNewPost$).toBeObservable(expected);
  });

});
