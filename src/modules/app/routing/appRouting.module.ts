/* istanbul ignore file */
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from '../components/notFound/notFound.component';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/posts',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
