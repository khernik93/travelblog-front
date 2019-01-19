import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { headerReducers } from './header.reducers';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { SwiperComponent } from './components/swiper/swiper.component';

import { MenuService } from './components/menu/menu.service';
import { SwiperService } from './components/swiper/swiper.service';

export const MODULE_DECLARATIONS = [
  HeaderComponent,
  LogoComponent,
  MenuComponent,
  SwiperComponent
];

export const MODULE_IMPORTS = [
  CommonModule
];

export const MODULE_PROVIDERS = [
  MenuService,
  SwiperService
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    StoreModule.forFeature('header', headerReducers)
  ],
  exports: [HeaderComponent],
  providers: MODULE_PROVIDERS
})
export class HeaderModule {
  constructor() { }
}
