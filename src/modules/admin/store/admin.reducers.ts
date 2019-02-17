import { ActionReducerMap } from '@ngrx/store';

import * as fromManagePosts from '../containers/managePosts/store/managePosts.reducer';

export interface AdminState {
  managePosts: fromManagePosts.ManagePostsState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  managePosts: fromManagePosts.managePostsReducer
};
