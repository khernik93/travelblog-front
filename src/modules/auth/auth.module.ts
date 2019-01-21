import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { authReducer } from './auth.reducer';
//import { authEffects } from './auth.effects';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/signIn/signIn.component';

import { AuthRoutingModule } from './routing/authRouting.module';

export const MODULE_DECLARATIONS = [
  AuthComponent,
  SignInComponent
];

export const MODULE_IMPORTS = [
  CommonModule,
  AuthRoutingModule,
  ReactiveFormsModule
];

const STORE_IMPORTS = [
  StoreModule.forFeature('auth', authReducer),
  //EffectsModule.forFeature([authEffects])
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...STORE_IMPORTS
  ],
  exports: [AuthComponent],
  providers: []
})
export class AuthModule {
  constructor() { }
}
