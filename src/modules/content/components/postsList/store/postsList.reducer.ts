import { PostsListActions, PostsListActionTypes } from './postsList.actions';
import { Post } from '../../../../../shared/clients/api.model';

export interface PostsListState {
  posts: Post[],
  loading: boolean
}

export const initialState: PostsListState = {
  posts: [],
  loading: false
};

export function postsListReducer(state = initialState, action: PostsListActions): PostsListState {
  switch (action.type) {

    case PostsListActionTypes.SetPosts: {
      return {
        ...state,
        posts: state.posts.concat(action.posts)
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
