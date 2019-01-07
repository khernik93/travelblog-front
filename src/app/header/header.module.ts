import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';

import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';

import { MenuService } from './menu/menu.service';

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
  providers: [
    MenuService
  ]
})

export class HeaderModule {
  constructor() { }
}
