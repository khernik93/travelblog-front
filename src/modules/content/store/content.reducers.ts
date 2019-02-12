import { ActionReducerMap } from '@ngrx/store';

import * as fromPostsList from '../components/postsList/store/postsList.reducer';
import * as fromRecentPosts from '../components/recentPosts/store/recentPosts.reducer';
import * as fromSinglePost from '../components/singlePost/store/singlePost.reducer';
import * as fromComments from '../components/comments/store/comments.reducer';

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
