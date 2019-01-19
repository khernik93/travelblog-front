import { Action } from '@ngrx/store';

import { Post } from '../postsList/postsList.model';

export enum SinglePostActionTypes {
  SetPost = '[SinglePost] Set post'
}

export class SetPost implements Action {
  readonly type = SinglePostActionTypes.SetPost;

  constructor(public post: Post) { }
}

export type SinglePostActions = SetPost;
