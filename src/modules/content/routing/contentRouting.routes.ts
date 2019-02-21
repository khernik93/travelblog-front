import { Routes } from '@angular/router';
import { LayoutContainer } from '../../app/containers/layout/layout.container';
import { PostsListContainer } from '../containers/postsList/postsList.container';
import { SinglePostContainer } from '../containers/singlePost/singlePost.container';

export const contentRoutesTree: Routes = [
  {
    path: 'posts',
    component: LayoutContainer,
    pathMatch: 'full',
    children: [
      { path: '', component: PostsListContainer, pathMatch: 'full' }
    ]
  },
  {
    path: 'posts/tab/:tabId',
    component: LayoutContainer,
    children: [
      { path: '', component: PostsListContainer, pathMatch: 'full' },
      { path: 'post/:postId', component: SinglePostContainer, pathMatch: 'full' }
    ]
  }
];

export type ContentRoutes = {
  postsList: (tabId) => string,
  singlePost: (tabId, postId) => string
};

export const contentRoutes: ContentRoutes = {
  postsList: (tabId) => `/posts/tab/${tabId}`,
  singlePost: (tabId, postId) => `/posts/tab/${tabId}/post/${postId}`
};
