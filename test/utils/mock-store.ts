import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { ActionReducerMap, MetaReducer, StoreModule, ReducerManager } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const MOCK_ACTION = '[MOCK] ACTION';
export const MOCK_STREAM = '[MOCK] Stream';

export class MockAction implements Action {
  readonly type = MOCK_ACTION;
  readonly payload: any;

  constructor(payload?: any) {
    this.payload = payload;
  }
}

export class MockStream implements Action {
  readonly type = MOCK_STREAM;
  readonly payload: { stream: Observable<any> };

  constructor(stream: Observable<any>) {
    this.payload = { stream };
  }
}

export function createMockReducer<T>(initialState: T) {
  return function reducer(state: any = initialState, action: { payload: any }): T {
    return { ...state, ...action.payload };
  };
}

const reducers: ActionReducerMap<any> = {};

const metaReducers: MetaReducer<any>[] = [];

export function initReducer(featureName: string, initialState: any) {
  return (reducer: ReducerManager) => {
    return () =>
      new Promise((resolve, reject) => {
        reducer.addReducer(featureName, createMockReducer(initialState));
        resolve('mocked reducer');
      });
  };
}
@NgModule({
  imports: [
    StoreModule.forRoot(reducers, { metaReducers }),
  ],
  exports: [
    StoreModule,
  ],
})
export class MockStoreModule {
  static forRoot(featureName: string, initialState: any): ModuleWithProviders {
    return {
      ngModule: MockStoreModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: initReducer(featureName, initialState), deps: [ReducerManager], multi: true },
      ],
    };
  }
}
