import * as recentPostsActions from '../../../../../src/modules/content/components/recentPosts/recentPosts.actions';
import { recentPostsReducer, initialState } from '../../../../../src/modules/content/components/recentPosts/recentPosts.reducer';
import { Post } from '../../../../../src/modules/content/components/postsList/postsList.model';

describe('RecentPostsReducer', () => {

  it('should set recent posts', () => {
    const recentPosts: Post[] = [
      {id: 1, createdAt: '123', title: 'test_title_1', tags: ['tag1'], content: 'test', commentsCount: 2},
      {id: 2, createdAt: '1234', title: 'test_title_2', tags: ['tag2', 'tag3'], content: 'test', commentsCount: 3}
    ];
    const action = new recentPostsActions.SetRecentPosts(recentPosts);
    const result = recentPostsReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      recentPosts: recentPosts
    });
  });

});
