import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import * as _ from 'lodash';

import { SinglePostResponse } from '../../../utils/responses/singlePost.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { SetPost, GetPost } from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { SinglePostEffects } from '../../../../src/modules/content/components/singlePost/store/singlePost.effects';
import { ApiClient } from '../../../../src/shared/clients/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';

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
    ClonedSinglePostResponse = _.cloneDeep(SinglePostResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPost action is dispatched
    THEN singlePostSerivce.getPost method should be executed
    AND SetPost action should be dispatched with fetched post
  `, () => {
    const id = ClonedSinglePostResponse.id;
    const action = new GetPost(id.toString());
    const outcome = new SetPost(ClonedSinglePostResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: { data: ClonedSinglePostResponse }});
    const expected = cold('--b', { b: outcome });
    apiClient.getPost.and.returnValue(response);
    expect(effects.getPost$).toBeObservable(expected);
  });

});
