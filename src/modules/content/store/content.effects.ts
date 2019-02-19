import { PostsListEffects } from '../containers/postsList/store/postsList.effects';
import { SinglePostEffects } from '../containers/singlePost/store/singlePost.effects';
import { RecentPostsEffects } from '../containers/recentPosts/store/recentPosts.effects';
import { CommentsEffects } from '../containers/comments/store/comments.effects';

export const contentEffects = [
  PostsListEffects,
  SinglePostEffects,
  RecentPostsEffects,
  CommentsEffects
];
