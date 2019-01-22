import { Action } from '@ngrx/store';

import { Post } from '../../../../../shared/clients/api.model';

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

  constructor(public recentPosts: Post[]) { }
}

export type RecentPostsActions = GetRecentPosts
  | SetRecentPosts;
