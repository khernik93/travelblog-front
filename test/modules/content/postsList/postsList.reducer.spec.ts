import cloneDeep from 'lodash-es/cloneDeep';

import * as postsListActions from '../../../../src/modules/content/components/postsList/store/postsList.actions';
import { postsListReducer, initialState } from '../../../../src/modules/content/components/postsList/store/postsList.reducer';
import { PostsListResponse } from '../../../utils/responses/postsList.response';

describe('PostsListReducer', () => {

  let ClonedPostsListResponse: typeof PostsListResponse;

  beforeEach(() => {
    ClonedPostsListResponse = cloneDeep(PostsListResponse);
  });

  it(`
    WHEN SetPosts action is dispatched
    THEN all posts should be stored in the store properly
  `, () => {
    const posts = ClonedPostsListResponse.content;
    const meta = { total: 5, start: 0, end: 1 };
    const action = new postsListActions.SetPosts(posts, meta);
    const result = postsListReducer(initialState, action);
    expect(result).toEqual({ ...initialState, posts: posts, meta: meta });
  });

  it(`
    WHEN ClearPosts action is dispatched
    THEN initialState should be restored
  `, () => {
    let filledState = cloneDeep(initialState);
    filledState.posts = ClonedPostsListResponse.content;
    filledState.meta = ClonedPostsListResponse.meta;

    const action = new postsListActions.ClearPosts();
    const result = postsListReducer(filledState, action);
    expect(result).toEqual(initialState);
  });

  it(`
    WHEN GetPosts action is dispatched
    OR GetPostsOnScroll action is dispatched
    THEN loading should be set to true
  `, () => {
    let result;

    result = postsListReducer(initialState, new postsListActions.GetPosts(null, null, null));
    expect(result).toEqual({ ...initialState, loading: true });

    result = postsListReducer(initialState, new postsListActions.GetPostsOnScroll(null));
    expect(result).toEqual({ ...initialState, loading: true });
  });

  it(`
    WHEN GetPostsSuccess action is dispatched
    OR GetPostsError action is dispatched
    OR SetPostsSuccess action is dispatched
    OR SetPostsError action is dispatched
    THEN loading should be set to false
  `, () => {
    let result;
    
    result = postsListReducer(initialState, new postsListActions.GetPostsSuccess());
    expect(result).toEqual({ ...initialState, loading: false, initialized: true });

    result = postsListReducer(initialState, new postsListActions.GetPostsError());
    expect(result).toEqual({ ...initialState, loading: false, initialized: true });

    result = postsListReducer(initialState, new postsListActions.SetPostsSuccess());
    expect(result).toEqual({ ...initialState, loading: false, initialized: true });

    result = postsListReducer(initialState, new postsListActions.SetPostsError());
    expect(result).toEqual({ ...initialState, loading: false, initialized: true });
  });

});
