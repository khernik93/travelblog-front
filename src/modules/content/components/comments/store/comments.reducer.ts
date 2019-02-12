import { CommentsActionTypes, CommentsActions } from './comments.actions';
import { CommentDTO } from '../../../../../shared/clients/api/api.model';

export interface CommentsState {
  comments: CommentDTO[]
}

export const initialState: CommentsState = {
  comments: null
};

export function commentsReducer(state = initialState, action: CommentsActions): CommentsState {
  switch (action.type) {

    case CommentsActionTypes.SetComments: {
      return {
        ...state,
        comments: action.comments
      }
    }

    default: {
      return state;
    }
  }
}
