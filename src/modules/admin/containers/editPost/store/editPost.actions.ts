import { Action } from '@ngrx/store';
import { Post } from '../../../../../shared/clients/backend/backend.model';

export enum EditPostActionTypes {
  EditPost = '[EditPost] Edit post',
  EditPostSuccess = '[EditPost] Edit post success',
  EditPostError = '[EditPost] Edit post error',
}

export class EditPost implements Action {
  readonly type = EditPostActionTypes.EditPost;
  constructor(public post: Post) { }
}

export class EditPostSuccess implements Action {
  readonly type = EditPostActionTypes.EditPostSuccess;
  constructor() { }
}

export class EditPostError implements Action {
  readonly type = EditPostActionTypes.EditPostError;
  constructor() { }
}

export type EditPostActions = EditPost
  | EditPostSuccess
  | EditPostError;
