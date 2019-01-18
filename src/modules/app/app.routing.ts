import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from '../../shared/components/notFound/notFound.component';

export const routes: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
