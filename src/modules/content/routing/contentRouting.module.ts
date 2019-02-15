import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostsListContainer } from '../containers/postsList/postsList.container';
import { SinglePostContainer } from '../containers/singlePost/singlePost.container';
import { LayoutContainer } from '../../app/containers/layout/layout.container';

export const routes: Routes = [
  { 
    path: 'posts',
    component: LayoutContainer,
    pathMatch: 'full',
    children: [
      { path: '', component: PostsListContainer, pathMatch: 'full' }
    ]
  },
  { 
    path: 'posts/:tabId',
    component: LayoutContainer, 
    children: [
      { path: '', component: PostsListContainer, pathMatch: 'full' },
      { path: ':postId', component: SinglePostContainer, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule { }
