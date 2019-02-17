import { ActionReducerMap } from '@ngrx/store';

import * as fromAdminPostsList from '../containers/adminPostsList/store/adminPostsList.reducer';

export interface AdminState {
  adminPostsList: fromAdminPostsList.AdminPostsListState;
}

export const adminReducers: ActionReducerMap<AdminState> = {
  adminPostsList: fromAdminPostsList.adminPostsListReducer
};
