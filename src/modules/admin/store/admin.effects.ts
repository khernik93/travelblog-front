import { AddNewPostEffects } from '../containers/addNewPost/store/addNewPost.effects';
import { EditPostEffects } from '../containers/editPost/store/editPost.effects';
import { AdminPostsListEffects } from '../containers/adminPostsList/store/adminPostsList.effects';

export const adminEffects = [
  AddNewPostEffects,
  AdminPostsListEffects,
  EditPostEffects
];
