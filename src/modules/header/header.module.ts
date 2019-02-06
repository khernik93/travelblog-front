// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Store
import { headerReducers } from './store/header.reducers';
import { headerEffects } from './store/header.effects';

// Components
import { HeaderComponent } from './header.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { RouterModule } from '@angular/router';

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
    ...STORE_IMPORTS,
    RouterModule
  ],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {
  constructor() { }
}
