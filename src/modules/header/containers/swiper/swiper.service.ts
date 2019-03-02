import { Injectable } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Injectable()
export class SwiperService {

  /**
   * Configuration object for initializing swiper element
   */
  public configuration: SwiperConfigInterface = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 300,
    preloadImages: true,
    pagination: {
      el: `.swiper-pagination`
    },
    navigation: {
      nextEl: `.swiper-button-next`,
      prevEl: `.swiper-button-prev`
    }
  };

}
