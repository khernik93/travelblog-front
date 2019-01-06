import { Action } from '@ngrx/store';

import { Post } from './content.model';

export enum ContentActionTypes {
  SetPhotos = '[Swiper] Set photos',
  SetPosts = '[Posts] Set posts'
}

export class SetPhotos implements Action {
  readonly type = ContentActionTypes.SetPhotos;

  constructor(public photos: Map<string, string[]>) { }
}

export class SetPosts implements Action {
  readonly type = ContentActionTypes.SetPosts;

  constructor(public posts: Post[]) { }
}

export type ContentActions =
  | SetPhotos
  | SetPosts;
