import { PostsListEffects } from './components/postsList/postsList.effects';
import { SinglePostEffects } from './components/singlePost/singlePost.effects';
import { RecentPostsEffects } from './components/recentPosts/recentPosts.effects';

export const contentEffects = [
  PostsListEffects,
  SinglePostEffects,
  RecentPostsEffects
];
