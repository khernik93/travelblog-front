import * as postsListActions from '../../../../../src/modules/content/components/postsList/postsList.actions';
import { postsListReducer, initialState } from '../../../../../src/modules/content/components/postsList/postsList.reducer';
import { Post } from '../../../../../src/modules/content/components/postsList/postsList.model';

describe('PostsListReducer', () => {

  it('should set posts', () => {
    const posts: Post[] = [
      {id: 1, createdAt: '123', title: 'test_title_1', tags: ['tag1'], content: 'test', commentsCount: 2},
      {id: 2, createdAt: '1234', title: 'test_title_2', tags: ['tag2', 'tag3'], content: 'test', commentsCount: 3}
    ];
    const action = new postsListActions.SetPosts(posts);
    const result = postsListReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      posts: posts
    });
  });

});
