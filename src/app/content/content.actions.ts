import { Action } from '@ngrx/store';

export enum ContentActionTypes {
  SetPhotos = '[Swiper] Set photos'
}

export class SetPhotos implements Action {
  readonly type = ContentActionTypes.SetPhotos;

  constructor(public photos: Map<string, string[]>) { }
}

export type ContentActions =
  | SetPhotos;
