import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer.component';

export const MODULE_DECLARATIONS = [
  FooterComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

export const MODULE_PROVIDERS = [];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [FooterComponent],
  providers: MODULE_PROVIDERS
})
export class FooterModule {
  constructor() { }
}
