import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { syncReducers } from './app.reducers';
import { TransferHttpModule } from './shared/transfer-http/transfer-http.module';

import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found404.component';
import { HeaderModule } from './header/header.module';
import { ContentModule } from './content/content.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TransferHttpModule,
    RouterModule.forRoot(routes, {
      useHash: false
    }),
    StoreModule.forRoot(syncReducers),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    HeaderModule,
    ContentModule
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent],
  providers: []
})

export class AppModule {
  constructor() { }
}
