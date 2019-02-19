import { Action } from '@ngrx/store';

import { TabDTO, PostContentDTO, MetaDTO, Post } from '../../../../../shared/clients/api/api.model';

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

  AddNewPost = '[Posts] Add new post',
  AddNewPostSuccess = '[Posts] Add new post success',
  AddNewPostError = '[Posts] Add new post error',

  EditPost = '[Posts] Edit post',
  EditPostSuccess = '[Posts] Edit post success',
  EditPostError = '[Posts] Edit post error',

  DeletePost = '[Posts] Delete post',
  DeletePostSuccess = '[Posts] Delete post success',
  DeletePostError = '[Posts] Delete post error',

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

export class AddNewPost implements Action {
  readonly type = PostsListActionTypes.AddNewPost;
  constructor(public post: Post) { }
}

export class AddNewPostSuccess implements Action {
  readonly type = PostsListActionTypes.AddNewPostSuccess;
  constructor() { }
}

export class AddNewPostError implements Action {
  readonly type = PostsListActionTypes.AddNewPostError;
  constructor() { }
}

export class EditPost implements Action {
  readonly type = PostsListActionTypes.EditPost;
  constructor(public post: Post) { }
}

export class EditPostSuccess implements Action {
  readonly type = PostsListActionTypes.EditPostSuccess;
  constructor() { }
}

export class EditPostError implements Action {
  readonly type = PostsListActionTypes.EditPostError;
  constructor() { }
}

export class DeletePost implements Action {
  readonly type = PostsListActionTypes.DeletePost;
  constructor(public id: number) { }
}

export class DeletePostSuccess implements Action {
  readonly type = PostsListActionTypes.DeletePostSuccess;
  constructor() { }
}

export class DeletePostError implements Action {
  readonly type = PostsListActionTypes.DeletePostError;
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
  | ClearPosts
  | AddNewPost
  | AddNewPostSuccess
  | AddNewPostError
  | EditPost
  | EditPostSuccess
  | EditPostSuccess
  | DeletePost
  | DeletePostSuccess
  | DeletePostError;
