import { Action } from '@ngrx/store';

export enum SwiperActionTypes {
  SetPhotos = '[Swiper] Set photos'
}

export class SetPhotos implements Action {
  readonly type = SwiperActionTypes.SetPhotos;

  constructor(public photos: Map<string, string[]>) { }
}

export type SwiperActions = SetPhotos;
