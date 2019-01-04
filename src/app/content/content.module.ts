import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { SwiperComponent } from './swiper/swiper.component';
import { PostListComponent } from './postList/postList.component';
import { RecentPostsComponent } from './recentPosts/recentPosts.component';
import { SelfieComponent } from './selfie/selfie.component';

@NgModule({
  declarations: [
    ContentComponent,
    SwiperComponent,
    PostListComponent,
    RecentPostsComponent,
    SelfieComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentComponent
  ],
  providers: []
})

export class ContentModule {
  constructor() { }
}
