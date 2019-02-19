import { ActionReducerMap } from '@ngrx/store';

import * as fromPostsList from '../containers/postsList/store/postsList.reducer';
import * as fromRecentPosts from '../containers/recentPosts/store/recentPosts.reducer';
import * as fromSinglePost from '../containers/singlePost/store/singlePost.reducer';
import * as fromComments from '../containers/comments/store/comments.reducer';

export interface ContentState {
  postsList: fromPostsList.PostsListState;
  recentPosts: fromRecentPosts.RecentPostsState;
  singlePost: fromSinglePost.SinglePostState;
  comments: fromComments.CommentsState;
}

export const contentReducers: ActionReducerMap<ContentState> = {
  postsList: fromPostsList.postsListReducer,
  recentPosts: fromRecentPosts.recentPostsReducer,
  singlePost: fromSinglePost.singlePostReducer,
  comments: fromComments.commentsReducer
};
