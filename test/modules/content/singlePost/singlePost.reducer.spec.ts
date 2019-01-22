import * as _ from 'lodash';

import * as singlePostActions from '../../../../src/modules/content/components/singlePost/store/singlePost.actions';
import { singlePostReducer, initialState } from '../../../../src/modules/content/components/singlePost/store/singlePost.reducer';
import { SinglePostResponse } from '../../../utils/responses/singlePost.response';

describe('SinglePostReducer', () => {

  let ClonedSinglePostResponse: typeof SinglePostResponse;

  beforeEach(() => {
    ClonedSinglePostResponse = _.cloneDeep(SinglePostResponse);
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
