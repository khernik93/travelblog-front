// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Store
import { headerReducers } from './store/header.reducers';
import { headerEffects } from './store/header.effects';

// Containers and components
import { HeaderComponent } from './header.component';
import { LogoComponent } from './components/logo/logo.component';
import { MenuComponent } from './components/menu/menu.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { RouterModule } from '@angular/router';
import { MenuContainer } from './containers/menu/menu.container';
import { SwiperContainer } from './containers/swiper/swiper.container';

export const MODULE_DECLARATIONS = [
  HeaderComponent,
  LogoComponent,
  MenuContainer,
  MenuComponent,
  SwiperContainer,
  SwiperComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  RouterModule
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
  providers: []
})
export class HeaderModule {
  constructor() { }
}
