import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from '../components/menu/store/menu.reducer';
import * as fromSwiper from '../components/swiper/store/swiper.reducer';

export interface HeaderState {
  menu: fromMenu.MenuState;
  swiper: fromSwiper.SwiperState;
}

export function headerReducers(): ActionReducerMap<HeaderState> {
  return {
    menu: fromMenu.menuReducer,
    swiper: fromSwiper.swiperReducer
  };
};
