import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { appRouting } from './app.routing';

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

@NgModule({
  declarations: [
    ...MODULE_DECLARATIONS,
    AppComponent,
    LayoutComponent,
    AdminLayoutComponent
  ],
  imports: [
    ...MODULE_IMPORTS,
    HeaderModule,
    ContentModule,
    FooterModule,
    AdminModule,
    StoreModule.forRoot(syncReducers),
    EffectsModule.forRoot([]),
    RouterModule.forRoot(appRouting, {useHash: false})
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
