import * as recentPostsActions from '../../../../../src/modules/content/components/recentPosts/recentPosts.actions';
import { recentPostsReducer, initialState } from '../../../../../src/modules/content/components/recentPosts/recentPosts.reducer';
import RecentPostsResponse from '../../../../utils/responses/recentPosts.response';

describe('RecentPostsReducer', () => {

  it(`
    WHEN SetRecentPosts action is dispatched
    THEN all recent posts should be stored in the store properly
  `, () => {
    const action = new recentPostsActions.SetRecentPosts(RecentPostsResponse);
    const result = recentPostsReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      recentPosts: RecentPostsResponse
    });
  });

});
