import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMenu from './components/menu/menu.reducer';
import * as fromSwiper from './components/swiper/swiper.reducer';

export const selectHeader = createFeatureSelector<HeaderState>('header');

export interface HeaderState {
  menu: fromMenu.MenuState;
  swiper: fromSwiper.SwiperState;
}

export const headerReducers: ActionReducerMap<HeaderState> = {
  menu: fromMenu.menuReducer,
  swiper: fromSwiper.swiperReducer
};
