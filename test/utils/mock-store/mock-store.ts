import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { StoreModule, ReducerManager, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initReducer } from './mock-reducer';

const reducers: ActionReducerMap<any> = {};
const metaReducers: MetaReducer<any>[] = [];

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
