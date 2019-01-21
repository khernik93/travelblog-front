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
      { path: '', component: PostsListComponent },
      { path: ':id', component: SinglePostComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule { }
