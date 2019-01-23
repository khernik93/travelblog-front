import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { SignOutComponent } from '../auth/components/signOut/signOut.component';

import { AdminRoutingModule } from './routing/adminRouting.module';

export const MODULE_DECLARATIONS = [
  AdminComponent,
  SignOutComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  AdminRoutingModule
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [AdminComponent],
  providers: []
})
export class AdminModule {
  constructor() { }
}
