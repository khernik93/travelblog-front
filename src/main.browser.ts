import './polyfills.browser';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { AppModule } from './modules/app/app.module';

if ('production' === ENV) {
  enableProdMode();
}

export function main(): Promise<any> {
  if (module.hot) {
    module.hot.accept();
  }
  return platformBrowserDynamic()
    .bootstrapModule(AppModule);
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
