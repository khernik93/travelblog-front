import { Action } from '@ngrx/store';
import { NewPostDisplay } from '../addNewPost.model';

export enum AddNewPostActionTypes {
  AddNewPost = '[AddNewPost] Add new post',
  AddNewPostSuccess = '[AddNewPost] Add new post success',
  AddNewPostError = '[AddNewPost] Add new post error'
}

export class AddNewPost implements Action {
  readonly type = AddNewPostActionTypes.AddNewPost;

  constructor(public newPost: NewPostDisplay) { }
}

export class AddNewPostSuccess implements Action {
  readonly type = AddNewPostActionTypes.AddNewPost;

  constructor() { }
}

export class AddNewPostError implements Action {
  readonly type = AddNewPostActionTypes.AddNewPost;

  constructor(public error: any) { }
}

export type AddNewPostActions = AddNewPost
  | AddNewPostSuccess
  | AddNewPostError;
