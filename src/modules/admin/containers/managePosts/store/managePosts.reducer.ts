import { TabDTO, PostContentDTO } from '../../../../../shared/clients/api/api.model';
import { ManagePostsActions, ManagePostsActionTypes } from './managePosts.actions';

export interface ManagePostsState {
  selectedTabId: number,
  posts: PostContentDTO[]
}

export const initialState: ManagePostsState = {
  selectedTabId: 0,
  posts: null
};

export function managePostsReducer(state = initialState, action: ManagePostsActions): ManagePostsState {
  switch (action.type) {

    case ManagePostsActionTypes.GetPosts: {
      return { ...state, selectedTabId: action.selectedTabId };
    }

    case ManagePostsActionTypes.SetPosts: {
      return { ...state, posts: action.posts };
    }

    default: {
      return state;
    }
  }
}
