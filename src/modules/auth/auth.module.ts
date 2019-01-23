// Global
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// Store
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';

// Components
import { AuthComponent } from './auth.component';
import { SignInComponent } from './components/signIn/signIn.component';

// Modules
import { AuthRoutingModule } from './routing/authRouting.module';

// Providers
import { AuthGuard } from './guards/auth.guard';
import { AuthReversedGuard } from './guards/authReversed.guard';
import { CookieService } from '../../shared/services/cookie.service';

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
    AuthGuard,
    AuthReversedGuard,
    CookieService
  ]
})
export class AuthModule {
  constructor() { }
}
