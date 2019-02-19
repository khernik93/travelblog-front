import { AdminPostsListEffects } from '../containers/adminPostsList/store/adminPostsList.effects';
import { AddNewPostEffects } from '../containers/addNewPost/store/addNewPost.effects';
import { EditPostEffects } from '../containers/editPost/store/editPost.effects';

export const adminEffects = [
  AdminPostsListEffects,
  AddNewPostEffects,
  EditPostEffects
];
