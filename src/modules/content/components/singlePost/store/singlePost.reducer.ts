import { SinglePostActions, SinglePostActionTypes } from './singlePost.actions';
import { Post } from '../../../../../shared/clients/api/api.model';

export interface SinglePostState {
  post: Post
}

export const initialState: SinglePostState = {
  post: null
};

export function singlePostReducer(state = initialState, action: SinglePostActions): SinglePostState {
  switch (action.type) {

    case SinglePostActionTypes.SetPost: {
      return {
        ...state,
        post: action.post
      }
    }

    default: {
      return state;
    }
  }
}
