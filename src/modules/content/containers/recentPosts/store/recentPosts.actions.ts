import { Action } from '@ngrx/store';
import { PostContentDTO } from '../../../../../shared/clients/backend/backend.model';

export enum RecentPostsActionTypes {
  GetRecentPosts = '[RecentPosts] Get recent posts',
  SetRecentPosts = '[RecentPosts] Set recent posts'
}

export class GetRecentPosts implements Action {
  readonly type = RecentPostsActionTypes.GetRecentPosts;

  constructor() { }
}

export class SetRecentPosts implements Action {
  readonly type = RecentPostsActionTypes.SetRecentPosts;

  constructor(public recentPosts: PostContentDTO[]) { }
}

export type RecentPostsActions = GetRecentPosts
  | SetRecentPosts;
