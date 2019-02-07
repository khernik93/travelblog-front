import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer.component';

export const MODULE_DECLARATIONS = [
  FooterComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  RouterModule
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [FooterComponent],
  providers: []
})
export class FooterModule {
  constructor() { }
}
