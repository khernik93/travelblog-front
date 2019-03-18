import { Action } from '@ngrx/store';
import { PostContentDTO } from '../../../../../shared/clients/backend/backend.model';

export enum SinglePostActionTypes {
  GetPost = '[SinglePost] Get post',
  SetPost = '[SinglePost] Set post',
  ClearPost = '[SinglePost] Clear post'
}

export class GetPost implements Action {
  readonly type = SinglePostActionTypes.GetPost;
  constructor(public id: string) { }
}

export class SetPost implements Action {
  readonly type = SinglePostActionTypes.SetPost;
  constructor(public post: PostContentDTO) { }
}

export class ClearPost implements Action {
  readonly type = SinglePostActionTypes.ClearPost;
  constructor() { }
}

export type SinglePostActions = GetPost
  | SetPost
  | ClearPost;
