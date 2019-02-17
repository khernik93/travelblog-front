import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from '../admin.component';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { AddNewPostContainer } from '../containers/addNewPost/addNewPost.container';
import { ManagePostsContainer } from '../containers/managePosts/managePosts.container';
import { EditPostContainer } from '../containers/editPost/editPost.container';

export const routes: Routes = [
  { 
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'managePosts', pathMatch: 'full' },
      { path: 'addNewPost', component: AddNewPostContainer, pathMatch: 'full' },
      { path: 'managePosts', component: ManagePostsContainer, pathMatch: 'full' },
      { path: 'editPost/:tabId/:postId', component: EditPostContainer, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
