import { Action } from '@ngrx/store';

import { TabDTO, PostContentDTO, MetaDTO } from '../../../../../shared/clients/backend/backend.model';

export enum PostsListActionTypes {

  GetPosts = '[Posts] Get posts',
  GetPostsInitial = '[Posts] Get posts initial',
  TryToGetPostsOnScroll = '[Posts] Try to get posts on scroll',
  GetPostsOnScroll = '[Posts] Get posts on scroll',
  GetPostsSuccess = '[Posts] Get posts success',
  GetPostsError = '[Posts] Get posts error',

  SetPosts = '[Posts] Set posts',
  SetPostsSuccess = '[Posts] Set posts success',
  SetPostsError = '[Posts] Set posts error',

  ClearPosts = '[Posts] Clear posts',

}

export class GetPosts implements Action {
  readonly type = PostsListActionTypes.GetPosts;
  constructor(public selectedTab: TabDTO, public start: number, public end: number) { }
}

export class GetPostsInitial implements Action {
  readonly type = PostsListActionTypes.GetPostsInitial;
  constructor(public selectedTab: TabDTO) { }
}

export class TryToGetPostsOnScroll implements Action {
  readonly type = PostsListActionTypes.TryToGetPostsOnScroll;
  constructor(public selectedTab: TabDTO) { }
}

export class GetPostsOnScroll implements Action {
  readonly type = PostsListActionTypes.GetPostsOnScroll;
  constructor(public selectedTab: TabDTO) { }
}

export class GetPostsSuccess implements Action {
  readonly type = PostsListActionTypes.GetPostsSuccess;
  constructor() { }
}

export class GetPostsError implements Action {
  readonly type = PostsListActionTypes.GetPostsError;
  constructor() { }
}

export class SetPosts implements Action {
  readonly type = PostsListActionTypes.SetPosts;
  constructor(public posts: PostContentDTO[], public meta: MetaDTO) { }
}

export class SetPostsSuccess implements Action {
  readonly type = PostsListActionTypes.SetPostsSuccess;
  constructor() { }
}

export class SetPostsError implements Action {
  readonly type = PostsListActionTypes.SetPostsError;
  constructor() { }
}

export class ClearPosts implements Action {
  readonly type = PostsListActionTypes.ClearPosts;
  constructor() { }
}

export type PostsListActions = SetPosts
  | SetPostsSuccess
  | SetPostsError
  | GetPosts
  | GetPostsInitial
  | GetPostsOnScroll
  | TryToGetPostsOnScroll
  | GetPostsSuccess
  | GetPostsError
  | ClearPosts;
