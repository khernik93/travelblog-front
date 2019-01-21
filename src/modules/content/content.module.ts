import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { contentReducers } from './content.reducers';
import { contentEffects } from './content.effects';

import { ContentRoutingModule } from './routing/contentRouting.module';

import { ContentComponent } from './content.component';
import { PostsListComponent } from './components/postsList/postsList.component';
import { RecentPostsComponent } from './components/recentPosts/recentPosts.component';
import { SelfieComponent } from './components/selfie/selfie.component';
import { SinglePostComponent } from './components/singlePost/singlePost.component';

import { PostsListService } from './components/postsList/postsList.service';
import { RecentPostsService } from './components/recentPosts/recentPosts.service';
import { SinglePostService } from './components/singlePost/singlePost.service';

export const MODULE_DECLARATIONS = [
  ContentComponent,
  PostsListComponent,
  RecentPostsComponent,
  SelfieComponent,
  SinglePostComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

const ROUTING_MODULE_IMPORTS = [
  ContentRoutingModule
];

const STORE_IMPORTS = [
  StoreModule.forFeature('content', contentReducers),
  EffectsModule.forFeature(contentEffects)
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...ROUTING_MODULE_IMPORTS,
    ...STORE_IMPORTS
  ],
  exports: [ContentComponent],
  providers: [
    PostsListService,
    RecentPostsService,
    SinglePostService
  ]
})
export class ContentModule {
  constructor() { }
}
