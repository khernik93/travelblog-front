/* istanbul ignore file */
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { adminRoutesTree } from './adminRouting.routes';

@NgModule({
  imports: [RouterModule.forChild(adminRoutesTree)],
  exports: [RouterModule],
  providers: []
})
export class AdminRoutingModule { }
