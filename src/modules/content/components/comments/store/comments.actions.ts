import { Action } from '@ngrx/store';
import { CommentDTO } from '../../../../../shared/clients/api/api.model';

export enum CommentsActionTypes {
  GetComments = '[Comments] Get comments',
  SetComments = '[Comments] Set comments'
}

export class GetComments implements Action {
  readonly type = CommentsActionTypes.GetComments;
  constructor(public postId: number) { }
}

export class SetComments implements Action {
    readonly type = CommentsActionTypes.SetComments;
    constructor(public comments: CommentDTO[]) { }
  }

export type CommentsActions = GetComments
  | SetComments;
