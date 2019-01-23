import * as authActions from '../../../src/modules/auth/store/auth.actions';
import { authReducer, initialState } from '../../../src/modules/auth/store/auth.reducer';

describe('AuthReducer', () => {

  it(`
    WHEN SetAuthenticated action is dispatched
    THEN the authenticated flag should be stored in the store properly
  `, () => {
    const action = new authActions.SetAuthenticated(true);
    const result = authReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      authenticated: true
    });
  });

});
