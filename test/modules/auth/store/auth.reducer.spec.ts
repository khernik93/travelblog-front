import * as authActions from '../../../../src/modules/auth/store/auth.actions';
import { authReducer, initialState } from '../../../../src/modules/auth/store/auth.reducer';

describe('AuthReducer', () => {

  it(`
    WHEN SetAuthenticated action is dispatched
    THEN authenticated flag is the same as parameter
  `, () => {
    const action = new authActions.SetAuthenticated(true);
    const result = authReducer(initialState, action);
    expect(result).toEqual({ ...initialState, authenticated: true });
  });

  it(`
    WHEN SignIn action is dispatched
    THEN authenticated is true
  `, () => {
    const action = new authActions.SignIn();
    const result = authReducer(initialState, action);
    expect(result).toEqual({ ...initialState, authenticated: true });
  });

  it(`
    WHEN SignOut action is dispatched
    THEN authenticated is false
  `, () => {
    const action = new authActions.SignOut();
    const result = authReducer(initialState, action);
    expect(result).toEqual({ ...initialState, authenticated: false });
  });

});
