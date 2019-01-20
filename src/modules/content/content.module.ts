import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { contentReducers } from './content.reducers';
import { contentEffects } from './content.effects';

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
  CommonModule,
  RouterModule,
  StoreModule.forFeature('content', contentReducers)
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    EffectsModule.forFeature(contentEffects)
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
