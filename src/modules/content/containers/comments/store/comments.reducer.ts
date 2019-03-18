import { CommentsActionTypes, CommentsActions } from './comments.actions';
import { CommentDTO } from '../../../../../shared/clients/backend/backend.model';

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

    case CommentsActionTypes.AddCommentSuccess: {
      return {
        ...state,
        comments: [action.commentDTO].concat(state.comments)
      }
    }

    default: {
      return state;
    }
  }
}
