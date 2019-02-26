import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { contentRoutesTree } from './contentRouting.routes';

@NgModule({
  imports: [RouterModule.forChild(contentRoutesTree)],
  exports: [RouterModule],
  providers: []
})
export class ContentRoutingModule { }
