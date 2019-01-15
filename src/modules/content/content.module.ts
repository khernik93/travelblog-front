import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { PostsListComponent } from './components/postsList/postsList.component';
import { RecentPostsComponent } from './components/recentPosts/recentPosts.component';
import { SelfieComponent } from './components/selfie/selfie.component';

import { SwiperService } from './components/swiper/swiper.service';
import { PostsListService } from './components/postsList/postsList.service';

export const MODULE_DECLARATIONS = [
  ContentComponent,
  SwiperComponent,
  PostsListComponent,
  RecentPostsComponent,
  SelfieComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

export const MODULE_PROVIDERS = [
  SwiperService,
  PostsListService
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [ContentComponent],
  providers: MODULE_PROVIDERS
})
export class ContentModule {
  constructor() { }
}
