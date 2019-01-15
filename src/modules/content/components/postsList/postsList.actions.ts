import { Action } from '@ngrx/store';

import { Post } from './postsList.model';

export enum PostsListActionTypes {
  SetPosts = '[Posts] Set posts'
}

export class SetPosts implements Action {
  readonly type = PostsListActionTypes.SetPosts;

  constructor(public posts: Post[]) { }
}

export type PostsListActions = SetPosts;
