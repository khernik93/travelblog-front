import { Action } from '@ngrx/store';

export enum SwiperActionTypes {
  GetPhotos = '[Swiper] Get photos',
  SetPhotos = '[Swiper] Set photos'
}

export class GetPhotos implements Action {
  readonly type = SwiperActionTypes.GetPhotos;

  constructor() { }
}

export class SetPhotos implements Action {
  readonly type = SwiperActionTypes.SetPhotos;

  constructor(public photos: Map<string, string[]>) { }
}

export type SwiperActions = GetPhotos
  | SetPhotos;
