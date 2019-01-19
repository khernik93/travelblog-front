import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';

import { syncReducers } from './app.reducers';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/notFound/notFound.component';

import { HeaderModule } from '../header/header.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';

import { TransferHttpService } from '../../shared/services/transferHttp.service';

export const APP_MODULE_DECLARATIONS = [
  AppComponent,
  LayoutComponent,
  NotFoundComponent
];

export const APP_MODULE_IMPORTS = [
  BrowserModule,
  HttpClientModule,
  StoreModule.forRoot(syncReducers),
  RouterModule.forRoot(routes, {useHash: false}),
  HeaderModule,
  ContentModule,
  FooterModule
];

export const APP_MODULE_PROVIDERS = [
  TransferHttpService
];

@NgModule({
  declarations: APP_MODULE_DECLARATIONS,
  imports: APP_MODULE_IMPORTS,
  providers: APP_MODULE_PROVIDERS,
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  constructor() { }
}
