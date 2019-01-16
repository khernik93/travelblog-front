import { Action } from '@ngrx/store';

import { Post } from '../postsList/postsList.model';

export enum RecentPostsActionTypes {
  SetRecentPosts = '[RecentPosts] Set recent posts'
}

export class SetRecentPosts implements Action {
  readonly type = RecentPostsActionTypes.SetRecentPosts;

  constructor(public recentPosts: Post[]) { }
}

export type RecentPostsActions = SetRecentPosts;
