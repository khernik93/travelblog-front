import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { SwiperComponent } from './swiper/swiper.component';
import { PostsComponent } from './posts/posts.component';
import { RecentPostsComponent } from './recentPosts/recentPosts.component';
import { SelfieComponent } from './selfie/selfie.component';

import { SwiperService } from './swiper/swiper.service';
import { PostsService } from './posts/posts.service';

@NgModule({
  declarations: [
    ContentComponent,
    SwiperComponent,
    PostsComponent,
    RecentPostsComponent,
    SelfieComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentComponent
  ],
  providers: [
    SwiperService,
    PostsService
  ]
})

export class ContentModule {
  constructor() { }
}
