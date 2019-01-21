import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import singlePostResponse from '../../../utils/responses/singlePost.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { SinglePostStubs } from './helpers/singlePost.stubs';
import { SetPost, GetPost } from '../../../../src/modules/content/components/singlePost/singlePost.actions';
import { SinglePostService } from '../../../../src/modules/content/components/singlePost/singlePost.service';
import { SinglePostEffects } from '../../../../src/modules/content/components/singlePost/singlePost.effects';

describe('SinglePostEffects', () => {

  let singlePostService: jasmine.SpyObj<SinglePostService>;

  let actions: TestActions;
  let effects: SinglePostEffects;

  beforeEach(() => {

    singlePostService = SinglePostStubs.getSinglePostService();

    TestBed.configureTestingModule({
      providers: [
        SinglePostEffects,
        { provide: Actions, useFactory: getActions },
        { provide: SinglePostService, useValue: singlePostService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(SinglePostEffects);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPost action is dispatched
    THEN singlePostSerivce.getPost method should be executed
    AND SetPost action should be dispatched with fetched post
  `, () => {
    const id = singlePostResponse.id;
    const action = new GetPost(id.toString());
    const outcome = new SetPost(singlePostResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: singlePostResponse });
    const expected = cold('--b', { b: outcome });
    singlePostService.getPost.and.returnValue(response);
    expect(effects.getPost$).toBeObservable(expected);
  });

});
