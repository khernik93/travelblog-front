import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';

export const MODULE_DECLARATIONS = [
  AdminComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  RouterModule
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
