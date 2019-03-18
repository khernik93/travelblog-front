import { SinglePostActions, SinglePostActionTypes } from './singlePost.actions';
import { PostContentDTO } from '../../../../../shared/clients/backend/backend.model';

export interface SinglePostState {
  post: PostContentDTO
}

export const initialState: SinglePostState = {
  post: null
};

export function singlePostReducer(state = initialState, action: SinglePostActions): SinglePostState {
  switch (action.type) {

    case SinglePostActionTypes.GetPost: {
      return { ...state, post: initialState.post }
    }

    case SinglePostActionTypes.SetPost: {
      return { ...state, post: action.post }
    }

    case SinglePostActionTypes.ClearPost: {
      return { ...state, post: initialState.post }
    }

    default: {
      return state;
    }
  }
}
