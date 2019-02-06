import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';

import { SinglePostResponse } from '../../../utils/responses/singlePost.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { SetPost, GetPost } from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { SinglePostEffects } from '../../../../src/modules/content/components/singlePost/store/singlePost.effects';
import { ApiClient } from '../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { SinglePostStubs } from './helpers/singlePost.stubs';

describe('SinglePostEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;

  let actions: TestActions;
  let effects: SinglePostEffects;
  let ClonedSinglePostResponse: typeof SinglePostResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        SinglePostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(SinglePostEffects);
  });

  beforeEach(() => {
    ClonedSinglePostResponse = cloneDeep(SinglePostResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPost action is dispatched
    THEN apiClient.getPost method should be executed
    AND SetPost action should be dispatched with fetched post
  `, () => {
    const id = SinglePostStubs.postId;
    const action = new GetPost(id);
    const outcome = new SetPost(ClonedSinglePostResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedSinglePostResponse });
    const expected = cold('--b', { b: outcome });
    apiClient.getPost.and.returnValue(response);
    expect(effects.getPost$).toBeObservable(expected);
  });

});
