import { PostsListActions, PostsListActionTypes } from './postsList.actions';
import { PostContentDTO, MetaDTO } from '../../../../../shared/clients/api/api.model';
import { AdminPostsListActions, AdminPostsListActionTypes } from '../../../../admin/containers/adminPostsList/store/adminPostsList.actions';

export interface PostsListState {
  posts: PostContentDTO[],
  initialized: boolean,
  loading: boolean,
  meta: MetaDTO
}

export const initialState: PostsListState = {
  posts: [],
  initialized: false,
  loading: false,
  meta: null
};

export function postsListReducer(state = initialState, action: PostsListActions | AdminPostsListActions): PostsListState {
  switch (action.type) {

    case PostsListActionTypes.GetPosts:
    case PostsListActionTypes.GetPostsInitial:
    case PostsListActionTypes.GetPostsOnScroll: {
      return { ...state, loading: true }
    }

    case PostsListActionTypes.SetPosts: {
      return {
        ...state,
        posts: state.posts.concat(action.posts),
        meta: action.meta
      }
    }

    case PostsListActionTypes.ClearPosts: {
      return { ...initialState }
    }

    case PostsListActionTypes.GetPostsSuccess:
    case PostsListActionTypes.GetPostsError:
    case PostsListActionTypes.SetPostsSuccess:
    case PostsListActionTypes.SetPostsError: {
      return { ...state, loading: false, initialized: true }
    }

    case AdminPostsListActionTypes.DeletePost: {
      return { ...state, posts: state.posts.filter(post => post.id !== action.id )}
    }

    default: {
      return state;
    }
  }
}
