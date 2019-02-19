import { Action } from '@ngrx/store';

export enum AdminPostsListActionTypes {
  DeletePost = '[AdminPostsList] Delete post',
  DeletePostSuccess = '[AdminPostsList] Delete post success',
  DeletePostError = '[AdminPostsList] Delete post error',
}

export class DeletePost implements Action {
  readonly type = AdminPostsListActionTypes.DeletePost;
  constructor(public id: number) { }
}

export class DeletePostSuccess implements Action {
  readonly type = AdminPostsListActionTypes.DeletePostSuccess;
  constructor() { }
}

export class DeletePostError implements Action {
  readonly type = AdminPostsListActionTypes.DeletePostError;
  constructor() { }
}

export type AdminPostsListActions = DeletePost
  | DeletePostSuccess
  | DeletePostError;
