import { Action } from '@ngrx/store';

import { Post } from '../../../../../shared/clients/api.model';

export enum PostsListActionTypes {
  GetPosts = '[Posts] Get posts',
  GetPostsSuccess = '[Posts] Get posts success',
  GetPostsError = '[Posts] Get posts error',
  GetPostsOnScroll = '[Posts] Get posts after scrolling with infinite scroll feature',
  SetPosts = '[Posts] Set posts',
  SetPostsSuccess = '[Posts] Set posts success',
  SetPostsError = '[Posts] Set posts error'
}

export class GetPosts implements Action {
  readonly type = PostsListActionTypes.GetPosts;

  constructor(public selectedTab: string) { }
}

export class GetPostsSuccess implements Action {
  readonly type = PostsListActionTypes.GetPostsSuccess;

  constructor() { }
}

export class GetPostsError implements Action {
  readonly type = PostsListActionTypes.GetPostsError;

  constructor() { }
}

export class GetPostsOnScroll implements Action {
  readonly type = PostsListActionTypes.GetPostsOnScroll;

  constructor(public selectedTab: string) { }
}

export class SetPosts implements Action {
  readonly type = PostsListActionTypes.SetPosts;

  constructor(public posts: Post[]) { }
}

export class SetPostsSuccess implements Action {
  readonly type = PostsListActionTypes.SetPostsSuccess;

  constructor() { }
}

export class SetPostsError implements Action {
  readonly type = PostsListActionTypes.SetPostsError;

  constructor() { }
}

export type PostsListActions = SetPosts
  | SetPostsSuccess
  | SetPostsError
  | GetPosts
  | GetPostsSuccess
  | GetPostsError
  | GetPostsOnScroll;
