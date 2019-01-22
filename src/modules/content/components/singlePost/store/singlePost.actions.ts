import { Action } from '@ngrx/store';

import { Post } from '../../../../../shared/clients/api.model';

export enum SinglePostActionTypes {
  GetPost = '[SinglePost] Get post',
  SetPost = '[SinglePost] Set post'
}

export class GetPost implements Action {
  readonly type = SinglePostActionTypes.GetPost;

  constructor(public id: string) { }
}

export class SetPost implements Action {
  readonly type = SinglePostActionTypes.SetPost;

  constructor(public post: Post) { }
}

export type SinglePostActions = GetPost
  | SetPost;
