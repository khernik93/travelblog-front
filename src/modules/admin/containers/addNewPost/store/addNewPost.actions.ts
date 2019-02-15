import { Action } from '@ngrx/store';
import { Post } from '../addNewPost.model';

export enum AddNewPostActionTypes {
  AddNewPost = '[AddNewPost] Add new post',
  AddNewPostSuccess = '[AddNewPost] Add new post success',
  AddNewPostError = '[AddNewPost] Add new post error'
}

export class AddNewPost implements Action {
  readonly type = AddNewPostActionTypes.AddNewPost;
  constructor(public post: Post) { }
}

export class AddNewPostSuccess implements Action {
  readonly type = AddNewPostActionTypes.AddNewPostSuccess;
  constructor() { }
}

export class AddNewPostError implements Action {
  readonly type = AddNewPostActionTypes.AddNewPostError;
  constructor() { }
}

export type AddNewPostActions = AddNewPost
  | AddNewPostSuccess
  | AddNewPostError;
