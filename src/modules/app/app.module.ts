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
import { NotificationComponent } from './components/notification/notification.component';

import { HeaderModule } from '../header/header.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';

import { TransferHttpService } from '../../shared/services/transferHttp.service';
import { ApiClient } from '../../shared/clients/api.client';

export const MODULE_DECLARATIONS = [
  NotFoundComponent,
  NotificationComponent
];

export const MODULE_IMPORTS = [
  BrowserModule,
  HttpClientModule
];

export const APP_MODULE_STORE_AND_EFFECTS = [
  StoreModule.forRoot(syncReducers),
  EffectsModule.forRoot([])
];

@NgModule({
  declarations: [
    ...MODULE_DECLARATIONS,
    AppComponent,
    LayoutComponent
  ],
  imports: [
    ...MODULE_IMPORTS,
    ...APP_MODULE_STORE_AND_EFFECTS,
    HeaderModule,
    ContentModule,
    FooterModule,
    RouterModule.forRoot(routes, {useHash: false})
  ],
  providers: [
    TransferHttpService,
    ApiClient
  ],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
  constructor() { }
}
