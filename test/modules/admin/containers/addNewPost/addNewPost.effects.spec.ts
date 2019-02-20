import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash-es/cloneDeep';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { AddNewPostEffects } from '../../../../../src/modules/admin/containers/addNewPost/store/addNewPost.effects';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { AddNewPost, AddNewPostSuccess } from '../../../../../src/modules/admin/containers/addNewPost/store/addNewPost.actions';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { PostsService } from '../../../../../src/modules/admin/services/posts.service';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';
import { TabsResponse } from '../../../../utils/responses/tabs.response';
import { Post } from '../../../../../src/shared/clients/api/api.model';

describe('AddNewPostEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let postsService: jasmine.SpyObj<PostsService>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: AddNewPostEffects;
  let ClonedTabsResponse: typeof TabsResponse;

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

    actions = TestBed.get(Actions);
    effects = TestBed.get(AddNewPostEffects);
  });

  beforeEach(() => {
    ClonedTabsResponse = cloneDeep(TabsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN AddNewPost action is dispatched
    THEN AddNewPostSuccess action is dispatched
  `, () => {
    const post: Post = {tabId: 1, title: '', tags: '', content: ''};
    const action = new AddNewPost(post);
    const outcome = new AddNewPostSuccess();
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: ClonedTabsResponse } );
    const apiResponse = cold('--b|', { b: null });
    const expected = cold('---c', { c: outcome });
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.addNewPost.and.returnValue(apiResponse);
    expect(effects.addNewPost$).toBeObservable(expected);
  });

});
