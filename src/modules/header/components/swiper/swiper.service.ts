import { Injectable } from '@angular/core';

@Injectable()
export class SwiperService {

  /**
   * Configuration object for initializing swiper element
   */
  public configuration = {
    wrapper: '.swiper-container',
    options: {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 300,
      preloadImages: true,
      pagination: {
        el: '.swiper-pagination'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  };

}
