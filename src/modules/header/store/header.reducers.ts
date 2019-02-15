import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from '../containers/menu/store/menu.reducer';
import * as fromSwiper from '../containers/swiper/store/swiper.reducer';

export interface HeaderState {
  menu: fromMenu.MenuState;
  swiper: fromSwiper.SwiperState;
}

export const headerReducers: ActionReducerMap<HeaderState> = {
  menu: fromMenu.menuReducer,
  swiper: fromSwiper.swiperReducer
};
