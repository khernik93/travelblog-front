import { SinglePostActions, SinglePostActionTypes } from './singlePost.actions';
import { PostContentDTO } from '../../../../../shared/clients/api/api.model';

export interface SinglePostState {
  post: PostContentDTO
}

export const initialState: SinglePostState = {
  post: Object.assign({})
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
