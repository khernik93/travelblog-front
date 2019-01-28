import { PostsListActions, PostsListActionTypes } from './postsList.actions';
import { Post, Meta } from '../../../../../shared/clients/api.model';

export interface PostsListState {
  posts: Post[],
  loading: boolean,
  meta: Meta
}

export const initialState: PostsListState = {
  posts: [],
  loading: false,
  meta: null
};

export function postsListReducer(state = initialState, action: PostsListActions): PostsListState {
  switch (action.type) {

    case PostsListActionTypes.SetPosts: {
      return {
        ...state,
        posts: state.posts.concat(action.posts),
        meta: action.meta
      }
    }

    case PostsListActionTypes.GetPosts: {
      return { ...state, loading: true }
    }

    case PostsListActionTypes.GetPostsSuccess: {
      return { ...state, loading: false }
    }

    case PostsListActionTypes.GetPostsOnScroll: {
      return { ...state, loading: true }
    }

    default: {
      return state;
    }
  }
}
