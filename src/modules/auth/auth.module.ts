import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { authReducer } from './auth.reducer';
import { AuthEffects } from './store/auth.effects';

import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/signIn/signIn.component';

import { AuthRoutingModule } from './routing/authRouting.module';

import { AuthService } from './auth.service';

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
  EffectsModule.forFeature([AuthEffects])
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...STORE_IMPORTS
  ],
  exports: [AuthComponent],
  providers: [
    AuthService
  ]
})
export class AuthModule {
  constructor() { }
}
