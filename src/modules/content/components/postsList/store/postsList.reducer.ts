import { PostsListActions, PostsListActionTypes } from './postsList.actions';
import { Post } from '../../../../../shared/clients/api.model';

export interface PostsListState {
  posts: Post[]
}

export const initialState: PostsListState = {
  posts: []
};

export function postsListReducer(state = initialState, action: PostsListActions): PostsListState {
  switch (action.type) {

    case PostsListActionTypes.SetPosts: {
      return {
        ...state,
        posts: state.posts.concat(action.posts)
      }
    }

    default: {
      return state;
    }
  }
}
