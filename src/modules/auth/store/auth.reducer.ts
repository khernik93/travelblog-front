import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  authenticated: boolean
}

export const initialState: AuthState = {
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.SetAuthenticated:
      return {
        ...state,
        authenticated: action.authenticated
      };

    case AuthActionTypes.SignIn:
    case AuthActionTypes.SignOut:
    default: {
      return state;
    }
    
  }
}
