import { AddNewPostEffects } from '../containers/addNewPost/store/addNewPost.effects';
import { ManagePostsEffects } from '../containers/managePosts/store/managePosts.effects';

export const adminEffects = [
  AddNewPostEffects,
  ManagePostsEffects
];
