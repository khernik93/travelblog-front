/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', component: NotFound404Component }
];
