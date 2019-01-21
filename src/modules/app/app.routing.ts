import { Routes } from '@angular/router';

import { NotFoundComponent } from './components/notFound/notFound.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminLayoutComponent } from './components/adminLayout/adminLayout.component';
import { PostsListComponent } from '../content/components/postsList/postsList.component';
import { SinglePostComponent } from '../content/components/singlePost/singlePost.component';

export const appRouting: Routes = [
  { 
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', component: PostsListComponent },
      { path: 'post/:id', component: SinglePostComponent }
    ]
  },
  { 
    path: 'admin', 
    component: AdminLayoutComponent,
    children: []
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];
