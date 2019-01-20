import * as singlePostActions from '../../../../../src/modules/content/components/singlePost/singlePost.actions';
import { singlePostReducer, initialState } from '../../../../../src/modules/content/components/singlePost/singlePost.reducer';
import singlePostResponse from '../../../../utils/responses/singlePost.response';

describe('SinglePostReducer', () => {

  it(`
    WHEN SetPost action is dispatched
    THEN the post should be stored in the store properly
  `, () => {
    const action = new singlePostActions.SetPost(singlePostResponse);
    const result = singlePostReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      post: singlePostResponse
    });
  });

});
