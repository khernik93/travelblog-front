import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentComponent } from './content.component';
import { SwiperComponent } from './swiper/swiper.component';

@NgModule({
  declarations: [
    ContentComponent,
    SwiperComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContentComponent
  ],
  providers: []
})

export class ContentModule {
  constructor() { }
}
