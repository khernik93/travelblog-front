import { RecentPostsActions, RecentPostsActionTypes } from './recentPosts.actions';
import { PostContentDTO } from '../../../../../shared/clients/api/api.model';

export interface RecentPostsState {
  recentPosts: PostContentDTO[]
}

export const initialState: RecentPostsState = {
  recentPosts: []
};

export function recentPostsReducer(state = initialState, action: RecentPostsActions): RecentPostsState {
  switch (action.type) {

    case RecentPostsActionTypes.SetRecentPosts: {
      return {
        ...state,
        recentPosts: action.recentPosts
      }
    }

    default: {
      return state;
    }
  }
}
