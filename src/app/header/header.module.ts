import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})

export class HeaderModule {
  constructor() { }
}
