import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';

import { MenuService } from './components/menu/menu.service';

export const MODULE_DECLARATIONS = [
  HeaderComponent,
  LogoComponent,
  MenuComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

export const MODULE_PROVIDERS = [
  MenuService
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: MODULE_IMPORTS,
  exports: [HeaderComponent],
  providers: MODULE_PROVIDERS
})
export class HeaderModule {
  constructor() { }
}
