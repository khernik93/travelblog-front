import { Action } from '@ngrx/store';

import { AuthCredentials } from '../auth.model';

export enum AuthActionTypes {
  SetAuthenticated = '[Auth] Set authenticated',
  TryToSignIn = '[Auth] Try to sign in',
  SignIn = '[Auth] Sign in',
  SignInError = '[Auth] Sign in error',
  SignOut = '[Auth] Sign out'
}

export class SetAuthenticated implements Action {
  readonly type = AuthActionTypes.SetAuthenticated;
  constructor(public authenticated: boolean) { }
}

export class TryToSignIn implements Action {
  readonly type = AuthActionTypes.TryToSignIn;
  constructor(public credentials: AuthCredentials) { }
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SignIn;
  constructor() { }
}

export class SignInError implements Action {
  readonly type = AuthActionTypes.SignInError;
  constructor() { }
}

export class SignOut implements Action {
  readonly type = AuthActionTypes.SignOut;
  constructor() { }
}

export type AuthActions = SetAuthenticated
  | TryToSignIn
  | SignIn
  | SignInError
  | SignOut;
