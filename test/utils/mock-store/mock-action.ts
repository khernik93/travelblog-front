import { Action } from '@ngrx/store';

export const MOCK_ACTION = '[MOCK] ACTION';

export class MockAction implements Action {
  readonly type = MOCK_ACTION;
  readonly payload: any;

  constructor(payload?: any) {
    this.payload = payload;
  }
}
