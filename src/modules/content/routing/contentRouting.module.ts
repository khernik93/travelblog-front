import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LayoutComponent } from '../../app/components/layout/layout.component';
import { PostsListComponent } from '../components/postsList/postsList.component';
import { SinglePostComponent } from '../components/singlePost/singlePost.component';

export const routes: Routes = [
  { 
    path: 'posts',
    component: LayoutComponent, 
    children: [
      { path: '', component: PostsListComponent, pathMatch: 'full' },
      { path: ':tabId', component: PostsListComponent, pathMatch: 'full' }
    ]
  },
  { 
    path: 'post',
    component: LayoutComponent, 
    children: [
      { path: ':postId', component: SinglePostComponent, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule { }
