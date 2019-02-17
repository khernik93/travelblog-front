import { TabDTO, PostContentDTO } from '../../../../../shared/clients/api/api.model';
import { AdminPostsListActions, AdminPostsListActionTypes } from './adminPostsList.actions';

export interface AdminPostsListState {
  selectedTabId: number,
  posts: PostContentDTO[]
}

export const initialState: AdminPostsListState = {
  selectedTabId: 0,
  posts: null
};

export function adminPostsListReducer(state = initialState, action: AdminPostsListActions): AdminPostsListState {
  switch (action.type) {

    case AdminPostsListActionTypes.GetAdminPosts: {
      return { ...state, selectedTabId: action.selectedTabId };
    }

    case AdminPostsListActionTypes.SetAdminPosts: {
      return { ...state, posts: action.posts };
    }

    default: {
      return state;
    }
  }
}
