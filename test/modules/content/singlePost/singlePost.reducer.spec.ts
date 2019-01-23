import cloneDeep from 'lodash-es/cloneDeep';

import * as singlePostActions from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { singlePostReducer, initialState } from '../../../../src/modules/content/components/singlePost/store/singlePost.reducer';
import { SinglePostResponse } from '../../../utils/responses/singlePost.response';

describe('SinglePostReducer', () => {

  let ClonedSinglePostResponse: typeof SinglePostResponse;

  beforeEach(() => {
    ClonedSinglePostResponse = cloneDeep(SinglePostResponse);
  });

  it(`
    WHEN SetPost action is dispatched
    THEN the post should be stored in the store properly
  `, () => {
    const action = new singlePostActions.SetPost(ClonedSinglePostResponse);
    const result = singlePostReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      post: ClonedSinglePostResponse
    });
  });

});
