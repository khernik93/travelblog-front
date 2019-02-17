import { Action } from '@ngrx/store';
import { TabDTO, PostContentDTO } from '../../../../../shared/clients/api/api.model';

export enum ManagePostsActionTypes {
  GetPosts = '[ManagePosts] Get posts',
  GetPostsSuccess = '[ManagePosts] Get posts success',
  GetPostsError = '[ManagePosts] Get posts error',
  SetPosts = '[ManagePosts] Set posts'
}

export class GetPosts implements Action {
  readonly type = ManagePostsActionTypes.GetPosts;
  constructor(public selectedTabId: number) { }
}

export class GetPostsSuccess implements Action {
  readonly type = ManagePostsActionTypes.GetPostsSuccess;
  constructor() { }
}

export class GetPostsError implements Action {
  readonly type = ManagePostsActionTypes.GetPostsError;
  constructor() { }
}

export class SetPosts implements Action {
  readonly type = ManagePostsActionTypes.SetPosts;
  constructor(public posts: PostContentDTO[]) { }
}

export type ManagePostsActions = GetPosts
  | GetPostsSuccess
  | GetPostsError
  | SetPosts;
