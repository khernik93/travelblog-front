import { Routes } from '@angular/router';

import { NotFoundComponent } from './components/notFound/notFound.component';
import { LayoutComponent } from './components/layout/layout.component';
import { PostsListComponent } from '../content/components/postsList/postsList.component';
import { SinglePostComponent } from '../content/components/singlePost/singlePost.component';

export const routes: Routes = [
  { 
    path: '', 
    component: LayoutComponent, 
    children: [
      { path: '', component: PostsListComponent },
      { path: 'post/:id', component: SinglePostComponent }
    ]
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];
