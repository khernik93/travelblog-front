import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngrx/store';
import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { CommentsResponse } from '../../../../utils/responses/comments.response';
import { CommentsEffects } from '../../../../../src/modules/content/containers/comments/store/comments.effects';
import { BackendClient } from '../../../../../src/shared/clients/backend/backend.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { Comment } from '../../../../../src/modules/content/containers/comments/comments.model';
import { CommentDTO } from '../../../../../src/shared/clients/api/api.model';

import { 
  GetComments, 
  SetComments, 
  AddComment, 
  AddCommentSuccess, 
  AddCommentError 
} from '../../../../../src/modules/content/containers/comments/store/comments.actions';

describe('CommentsEffects', () => {

  let apiClient: jasmine.SpyObj<BackendClient>;
  let store: MockStore<ContentState>;

  let actions: TestActions;
  let effects: CommentsEffects;
  let ClonedCommentsResponse: typeof CommentsResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getBackendClientStub();
    store = SharedStubs.getMockStoreStub<ContentState>();

    TestBed.configureTestingModule({
      providers: [
        CommentsEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BackendClient, useValue: apiClient },
        { provide: Store, useValue: store }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(CommentsEffects);
  });

  beforeEach(() => {
    ClonedCommentsResponse = cloneDeep(CommentsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetComments action is dispatched
    THEN SetComments is dispatched with fetched comment
  `, () => {
    const postId = 1;
    const action = new GetComments(postId);
    const outcome = new SetComments(ClonedCommentsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedCommentsResponse });
    const expected = cold('--(b)', { b: outcome });
    apiClient.getComments.and.returnValue(response);
    expect(effects.getComments$).toBeObservable(expected);
  });

  it(`
    WHEN AddComment action is dispatched
    THEN current post is fetched from store
    AND comment is added
    AND AddCommentSuccess is dispatched
  `, () => {
    const comment: Comment = { content: 'content' };
    const commentDTO: CommentDTO = { id: 1, createdAt: '', name: '', email: '', content: '' };

    const action = new AddComment(comment);
    const outcome = new AddCommentSuccess(commentDTO);
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: { postId: 1, comment } });
    const apiResponse = cold('--b|', { b: commentDTO });
    const expected = cold('---c', { c: outcome });
    
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.addComment.and.returnValue(apiResponse);
    expect(effects.addComment$).toBeObservable(expected);
  });

  it(`
    WHEN AddComment action is dispatched
    THEN current post is fetched from store
    AND comment is not added because of an error
    AND AddCommentError is dispatched
  `, () => {
    const comment: Comment = { content: 'content' };

    const action = new AddComment(comment);
    const outcome = new AddCommentError();
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: { postId: 1, comment } });
    const apiResponse = cold('--#|', {}, new Error());
    const expected = cold('---c', { c: outcome });
    
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.addComment.and.returnValue(apiResponse);
    expect(effects.addComment$).toBeObservable(expected);
  });

});
