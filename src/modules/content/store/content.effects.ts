import { PostsListEffects } from '../components/postsList/store/postsList.effects';
import { SinglePostEffects } from '../components/singlePost/store/singlePost.effects';
import { RecentPostsEffects } from '../components/recentPosts/store/recentPosts.effects';

export const contentEffects = [
  PostsListEffects,
  SinglePostEffects,
  RecentPostsEffects
];
