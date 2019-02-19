/* istanbul ignore file */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from '../admin.component';

import { AuthGuard } from '../../auth/guards/auth.guard';
import { AddNewPostContainer } from '../containers/addNewPost/addNewPost.container';
import { EditPostContainer } from '../containers/editPost/editPost.container';
import { AdminPostsListContainer } from '../containers/adminPostsList/adminPostsList.container';

export const routes: Routes = [
  { 
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'postsList', pathMatch: 'full' },
      { path: 'postsList', component: AdminPostsListContainer, pathMatch: 'full' },
      { path: 'addNewPost', component: AddNewPostContainer, pathMatch: 'full' },
      { path: 'editPost/tabId/:tabId/postId/:postId', component: EditPostContainer, pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
