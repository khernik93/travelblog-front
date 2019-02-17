import { Action } from '@ngrx/store';
import { PostContentDTO } from '../../../../../shared/clients/api/api.model';

export enum AdminPostsListActionTypes {
  GetAdminPosts = '[AdminPostsList] Get posts',
  GetAdminPostsSuccess = '[AdminPostsList] Get posts success',
  GetAdminPostsError = '[AdminPostsList] Get posts error',
  SetAdminPosts = '[AdminPostsList] Set posts'
}

export class GetAdminPosts implements Action {
  readonly type = AdminPostsListActionTypes.GetAdminPosts;
  constructor(public selectedTabId: number) { }
}

export class GetAdminPostsSuccess implements Action {
  readonly type = AdminPostsListActionTypes.GetAdminPostsSuccess;
  constructor() { }
}

export class GetAdminPostsError implements Action {
  readonly type = AdminPostsListActionTypes.GetAdminPostsError;
  constructor() { }
}

export class SetAdminPosts implements Action {
  readonly type = AdminPostsListActionTypes.SetAdminPosts;
  constructor(public posts: PostContentDTO[]) { }
}

export type AdminPostsListActions = GetAdminPosts
  | GetAdminPostsSuccess
  | GetAdminPostsError
  | SetAdminPosts;
