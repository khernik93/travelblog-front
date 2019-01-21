import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { syncReducers } from './app.reducers';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminLayoutComponent } from './components/adminLayout/adminLayout.component';
import { NotFoundComponent } from './components/notFound/notFound.component';
import { NotificationComponent } from './components/notification/notification.component';

import { HeaderModule } from '../header/header.module';
import { ContentModule } from '../content/content.module';
import { FooterModule } from '../footer/footer.module';
import { AdminModule } from '../admin/admin.module';
import { AppRoutingModule } from './routing/appRouting.module';
import { ContentRoutingModule } from '../content/routing/contentRouting.module';

import { TransferHttpService } from '../../shared/services/transferHttp.service';
import { ApiClient } from '../../shared/clients/api.client';

export const MODULE_DECLARATIONS = [
  NotFoundComponent,
  NotificationComponent
];

const LAYOUT_MODULE_DECLARATIONS = [
  AppComponent,
  LayoutComponent,
  AdminLayoutComponent
];

export const MODULE_IMPORTS = [
  BrowserModule,
  HttpClientModule
];

const ROOT_MODULE_IMPORTS = [
  HeaderModule,
  ContentModule,
  FooterModule,
  AdminModule
];

const ROUTING_MODULE_IMPORTS = [
  AppRoutingModule,
  ContentRoutingModule
];

const STORE_IMPORTS = [
  StoreModule.forRoot(syncReducers),
  EffectsModule.forRoot([])
];

@NgModule({
  declarations: [
    ...MODULE_DECLARATIONS,
    ...LAYOUT_MODULE_DECLARATIONS
  ],
  imports: [
    ...MODULE_IMPORTS,
    ...ROOT_MODULE_IMPORTS,
    ...ROUTING_MODULE_IMPORTS,
    ...STORE_IMPORTS
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
