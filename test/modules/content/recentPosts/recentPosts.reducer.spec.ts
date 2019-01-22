import * as _ from 'lodash';

import * as recentPostsActions from '../../../../src/modules/content/components/recentPosts/store/recentPosts.actions';
import { recentPostsReducer, initialState } from '../../../../src/modules/content/components/recentPosts/store/recentPosts.reducer';
import { RecentPostsResponse } from '../../../utils/responses/recentPosts.response';

describe('RecentPostsReducer', () => {

  let ClonedRecentPostsResponse: typeof RecentPostsResponse;

  beforeEach(() => {
    ClonedRecentPostsResponse = _.cloneDeep(ClonedRecentPostsResponse);
  });

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
