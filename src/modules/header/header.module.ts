import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { headerReducers } from './header.reducers';
import { headerEffects } from './header.effects';

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

const STORE_IMPORTS = [
  StoreModule.forFeature('header', headerReducers),
  EffectsModule.forFeature(headerEffects)
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...STORE_IMPORTS
  ],
  exports: [HeaderComponent],
  providers: [
    MenuService,
    SwiperService
  ]
})
export class HeaderModule {
  constructor() { }
}
