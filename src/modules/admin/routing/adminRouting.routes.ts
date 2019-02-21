import { Routes } from '@angular/router';
import { AdminComponent } from '../admin.component';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { AdminPostsListContainer } from '../containers/adminPostsList/adminPostsList.container';
import { AddNewPostContainer } from '../containers/addNewPost/addNewPost.container';
import { EditPostContainer } from '../containers/editPost/editPost.container';

export const adminRoutesTree: Routes = [
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

export type AdminRoutes = {
  postsList: string,
  addNewPost: string,
  editPost: (tabId, postId) => string
};

export const adminRoutes: AdminRoutes = {
  postsList: '/admin/postsList',
  addNewPost: '/admin/addNewPost',
  editPost: (tabId, postId) => `/admin/editPost/tabId/${tabId}/postId/${postId}`
};
