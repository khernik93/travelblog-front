/* istanbul ignore file */
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { appRoutesTree } from './appRouting.routes';

@NgModule({
  imports: [RouterModule.forRoot(appRoutesTree)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
