import { Action } from '@ngrx/store';
import { CommentDTO } from '../../../../../shared/clients/api/api.model';
import { Comment } from '../comments.model';

export enum CommentsActionTypes {
  GetComments = '[Comments] Get comments',
  SetComments = '[Comments] Set comments',
  AddComment = '[Comments] Add comment',
  AddCommentSuccess = '[Comments] Add comment success',
  AddCommentError = '[Comments] Add comment error'
}

export class GetComments implements Action {
  readonly type = CommentsActionTypes.GetComments;
  constructor(public postId: number) { }
}

export class SetComments implements Action {
  readonly type = CommentsActionTypes.SetComments;
  constructor(public comments: CommentDTO[]) { }
}

export class AddComment implements Action {
  readonly type = CommentsActionTypes.AddComment;
  constructor(public comment: Comment) { }
}

export class AddCommentSuccess implements Action {
  readonly type = CommentsActionTypes.AddCommentSuccess;
  constructor(public commentDTO: CommentDTO) { }
}

export class AddCommentError implements Action {
  readonly type = CommentsActionTypes.AddCommentError;
  constructor() { }
}

export type CommentsActions = GetComments
  | SetComments
  | AddComment
  | AddCommentSuccess
  | AddCommentError;
