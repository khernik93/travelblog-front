import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { routes } from './app.routing';

import { syncReducers } from './app.reducers';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/notFound/notFound.component';

import { HeaderModule } from '../header/header.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';

import { TransferHttpService } from '../../shared/services/transferHttp.service';

export const MODULE_DECLARATIONS = [
  AppComponent,
  LayoutComponent,
  NotFoundComponent
];

export const MODULE_IMPORTS = [
  BrowserModule,
  HttpClientModule,
  RouterModule.forRoot(routes, {useHash: false}),
  HeaderModule,
  ContentModule,
  FooterModule
];

export const MODULE_PROVIDERS = [
  TransferHttpService
];

export const APP_MODULE_STORE_AND_EFFECTS = [
  StoreModule.forRoot(syncReducers),
  EffectsModule.forRoot([])
];

@NgModule({
  declarations: MODULE_DECLARATIONS,
  imports: [
    ...MODULE_IMPORTS,
    ...APP_MODULE_STORE_AND_EFFECTS
  ],
  providers: MODULE_PROVIDERS,
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  constructor() { }
}
