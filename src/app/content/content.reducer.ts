/* tslint:disable: no-switch-case-fall-through */
import { ContentActions, ContentActionTypes } from './content.actions';
import { Post } from './content.model';

export interface ContentState {
  photos: Map<string, string[]>,
  posts: Post[]
}

export const initialState: ContentState = {
  photos: null,
  posts: []
};

export function contentReducer(state = initialState, action: ContentActions): ContentState {
  switch (action.type) {

    case ContentActionTypes.SetPhotos: {
      return {
        ...state,
        photos: action.photos
      };
    }

    case ContentActionTypes.SetPosts: {
      return {
        ...state,
        posts: action.posts
      }
    }

    default: {
      return state;
    }
  }
}
