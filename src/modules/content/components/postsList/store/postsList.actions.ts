import { Action } from '@ngrx/store';

import { Post } from '../../../../../shared/clients/api.model';

export enum PostsListActionTypes {
  GetPosts = '[Posts] Get posts',
  SetPosts = '[Posts] Set posts'
}

export class GetPosts implements Action {
  readonly type = PostsListActionTypes.GetPosts;

  constructor(public selectedTab: string) { }
}

export class SetPosts implements Action {
  readonly type = PostsListActionTypes.SetPosts;

  constructor(public posts: Post[]) { }
}

export type PostsListActions = SetPosts
  | GetPosts;
