import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { PostsListComponent } from './components/postsList/postsList.component';
import { RecentPostsComponent } from './components/recentPosts/recentPosts.component';
import { SelfieComponent } from './components/selfie/selfie.component';

import { PostsListService } from './components/postsList/postsList.service';
import { RecentPostsService } from './components/recentPosts/recentPosts.service';

export const MODULE_DECLARATIONS = [
  ContentComponent,
  PostsListComponent,
  RecentPostsComponent,
  SelfieComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

export const MODULE_PROVIDERS = [
  PostsListService,
  RecentPostsService
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
