import { AuthActions, AuthActionTypes } from './auth.actions';

export interface AuthState {
  authenticated: boolean
}

export const initialState: AuthState = {
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.SignIn: {
      return {
        ...state,
        authenticated: true
      }
    }

    case AuthActionTypes.SignOut: {
      return {
        ...state,
        authenticated: false
      }
    }

    default: {
      return state;
    }
  }
}
