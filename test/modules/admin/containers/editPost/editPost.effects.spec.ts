import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash-es/cloneDeep';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { EditPostEffects } from '../../../../../src/modules/admin/containers/editPost/store/editPost.effects';
import { BackendClient } from '../../../../../src/shared/clients/backend/backend.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { EditPost, EditPostSuccess } from '../../../../../src/modules/admin/containers/editPost/store/editPost.actions';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { PostsService } from '../../../../../src/modules/admin/services/posts.service';
import { AdminStubs } from '../../../../utils/stubs/admin.stubs';
import { TabsResponse } from '../../../../utils/responses/tabs.response';
import { Post } from '../../../../../src/shared/clients/api/api.model';

describe('EditPostEffects', () => {

  let apiClient: jasmine.SpyObj<BackendClient>;
  let postsService: jasmine.SpyObj<PostsService>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: EditPostEffects;
  let ClonedTabsResponse: typeof TabsResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getBackendClientStub();
    store = SharedStubs.getMockStoreStub<HeaderState>();
    postsService = AdminStubs.postsService();

    TestBed.configureTestingModule({
      providers: [
        EditPostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BackendClient, useValue: apiClient },
        { provide: PostsService, useValue: postsService },
        { provide: Store, useValue: store }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(EditPostEffects);
  });

  beforeEach(() => {
    ClonedTabsResponse = cloneDeep(TabsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN EditPost action is dispatched
    THEN EditPostSuccess action is dispatched
  `, () => {
    const post: Post = {tabId: 1, tags: '', title: '', content: ''};
    const action = new EditPost(post);
    const outcome = new EditPostSuccess();
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: ClonedTabsResponse });
    const apiResponse = cold('--b|', { b: null });
    const expected = cold('---c', { c: outcome });
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.updatePost.and.returnValue(apiResponse);
    expect(effects.editPost$).toBeObservable(expected);
  });

});
