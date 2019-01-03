/* tslint:disable: no-switch-case-fall-through */
import { ContentActions, ContentActionTypes } from './content.actions';

export interface ContentState {
  photos: Map<string, string[]>
}

export const initialState: ContentState = {
  photos: null
};

export function contentReducer(state = initialState, action: ContentActions): ContentState {
  switch (action.type) {

    case ContentActionTypes.SetPhotos: {
      return {
        ...state,
        photos: action.photos
      };
    }

    default: {
      return state;
    }
  }
}
