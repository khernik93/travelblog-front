import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { authRoutesTree } from './authRouting.routes';

@NgModule({
  imports: [RouterModule.forChild(authRoutesTree)],
  exports: [RouterModule],
  providers: []
})
export class AuthRoutingModule { }
