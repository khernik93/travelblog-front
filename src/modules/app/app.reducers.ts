import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';

import * as fromMenu from '../header/components/menu/menu.reducer';
import * as fromSwiper from '../header/components/swiper/swiper.reducer';
import * as fromPostsList from '../content/components/postsList/postsList.reducer';
import * as fromRecentPosts from '../content/components/recentPosts/recentPosts.reducer';
import * as fromSinglePost from '../content/components/singlePost/singlePost.reducer';

interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  menu: fromMenu.MenuState;
  swiper: fromSwiper.SwiperState;
  postsList: fromPostsList.PostsListState;
  recentPosts: fromRecentPosts.RecentPostsState;
  singlePost: fromSinglePost.SinglePostState;
}

export const syncReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  menu: fromMenu.menuReducer,
  swiper: fromSwiper.swiperReducer,
  postsList: fromPostsList.postsListReducer,
  recentPosts: fromRecentPosts.recentPostsReducer,
  singlePost: fromSinglePost.singlePostReducer
};
