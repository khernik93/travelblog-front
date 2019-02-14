// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Store
import { contentReducers } from './store/content.reducers';
import { contentEffects } from './store/content.effects';

// Routing
import { ContentRoutingModule } from './routing/contentRouting.module';

// Components
import { ContentComponent } from './content.component';
import { PostsListComponent } from './components/postsList/postsList.component';
import { RecentPostsComponent } from './components/recentPosts/recentPosts.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { SinglePostComponent } from './components/singlePost/singlePost.component';
import { CommentsComponent } from './components/comments/comments.component';
import { LineBreakComponent } from '../../shared/components/lineBreak/lineBreak.component';
import { SafeHtmlPipe } from '../app/pipes/safeHtml.pipe';

// Services
import { PostsListService } from './containers/postsList/postsList.service';
import { SwiperService } from '../header/containers/swiper/swiper.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from './containers/comments/comments.service';
import { PostsListContainer } from './containers/postsList/postsList.component';
import { RecentPostsContainer } from './containers/recentPosts/recentPosts.component';
import { SinglePostContainer } from './containers/singlePost/singlePost.component';
import { CommentsContainer } from './containers/comments/comments.container';

export const MODULE_DECLARATIONS = [
  ContentComponent,
  PostsListContainer,
  PostsListComponent,
  RecentPostsContainer,
  RecentPostsComponent,
  SelfieComponent,
  SinglePostContainer,
  SinglePostComponent,
  CommentsContainer,
  CommentsComponent,
  LineBreakComponent,
  SafeHtmlPipe
];

export const MODULE_IMPORTS = [
  CommonModule,
  InfiniteScrollModule,
  ReactiveFormsModule
];

const ROUTING_MODULE_IMPORTS = [
  ContentRoutingModule
];

const STORE_IMPORTS = [
  StoreModule.forFeature('content', contentReducers),
  EffectsModule.forFeature(contentEffects)
];

const MODULE_PROVIDERS = [
  PostsListService,
  SwiperService,
  CommentsService
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...ROUTING_MODULE_IMPORTS,
    ...STORE_IMPORTS
  ],
  exports: [ContentComponent],
  providers: MODULE_PROVIDERS
})
export class ContentModule {
  constructor() { }
}
